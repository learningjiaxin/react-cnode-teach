const axios = require('axios')
const path = require('path')
const proxy = require('http-proxy-middleware')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const serverRender = require('./server-render')

const getTemplate = () => new Promise((resolve, reject) => {
  axios.get('http://localhost:8888/public/server.template.ejs')
    .then(res => {
      resolve(res.data)
    })
    .catch(reject)
})

/** build bundle.js */
const webpackServerConfig = require('../../build/webpack.server.config')
const serverCompiler = webpack(webpackServerConfig)
const mfs = new MemoryFs()
/** compile bundle.js in memory */
let serverBundle
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({
  /** configuration objects */
}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))

  const bundlePath = path.join(
    webpackServerConfig.output.path,
    webpackServerConfig.output.filename
  )
  /** read bundle.js string from memory */
  const bundleJsStr = mfs.readFileSync(bundlePath, 'utf-8')

  const NativeModule = require('module')
  const vm = require('vm')
  const getModuleFromString = (bundle, filename) => {
    const m = { exports: {} }
    const wrapper = NativeModule.wrap(bundle)
    const script = new vm.Script(wrapper, { filename })
    const result = script.runInThisContext({ displayErrors: true })
    result.call(m.exports, m.exports, require, m)// 'require' is in our current context, solve 'react is not found' error
    return m
  }
  const m = getModuleFromString(bundleJsStr, 'server-entry.js')
  serverBundle = m.exports
})

module.exports = (app) => {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', (req, res, next) => {
    if (!serverBundle) {
      res.send('waiting to compile, refresh later ')
    }
    getTemplate().then(template => {
      serverRender(serverBundle, template, req, res)
    }).catch(next)
  })
}
