const serialize = require('serialize-javascript')
const ejs = require('ejs')
const asyncBootstrapper = require('react-async-bootstrapper')
const ReactDOMServer = require('react-dom/server')
const Helmet = require('react-helmet').default

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default
    const routerContext = {}
    const stores = createStoreMap()
    const serverEntry = createApp(stores, routerContext, req.url)

    const getStoreState = (stores) => {
      return Object.keys(stores).reduce((results, storeName) => {
        results[storeName] = stores[storeName].toJson()
        return results
      }, {})
    }

    asyncBootstrapper(serverEntry).then(() => {
      /** Redirect */
      // 路由跳转，如果在服务端渲染过程中发现路由跳转直接redirect掉，而不需要在客户端redirect，在客户端redirect返回的是当前页面的内容，爬虫爬不到任何内容，不利于 seo 处理
      if (routerContext.url) {
        res.writeHead(302, {
          Location: routerContext.url
        })
        res.end()
        return
      }

      const helmet = Helmet.rewind()
      // console.log(stores.appState.name)
      const storeState = getStoreState(stores)
      console.log(storeState)
      const content = ReactDOMServer.renderToString(serverEntry)

      // 获取服务端渲染的html的内容
      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(storeState), // 同步store的内容，有服务端使用的数据，在客户端渲染的时候可以马上拿到，而不需要再去请求
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString()
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}
