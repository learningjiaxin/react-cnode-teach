const axios = require('axios')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const path = require('path')
const proxy = require('http-proxy-middleware')
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      }).catch((error) =>{
        console.error("error: " + error)
      })
  })
}
const Module = module.constructor
const mfs = new MemoryFs
// 启动一个webpack的compiler
// 作用是监听entry下面依赖的文件是否有变化
const serverCompiler = webpack(serverConfig)
// 这样以前通过fs读写的文件变成mfs读写，内存读写比硬盘快
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  stats = stats.toJson()
  stats.errors.forEach(err => {
    console.error(err)
  })
  stats.warnings.forEach(warn => {
    console.warn(warn)
  })

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  // 读出来是string的，不是模块可以直接用的
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  // 通过module的构造方法创建一个module
  const m = new Module()
  // 用module去解析javaScript虚拟内容，生成一个新的模块
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})
module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', function (req, res) {
    getTemplate().then(template => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(template.replace('<!-- app -->', content))
    }).catch((error) =>{
      console.log("errorgetTemplate: " + error)
    })
  })
}
