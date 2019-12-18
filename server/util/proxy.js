const axios = require('axios')
const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  // console.log(req, 'sessionsessionsession')
  const path = req.path
  const user = req.session.user || {}
  // 把token放到req的query上边，也就是url后边?跟上
  const needAccessToken = req.query.needAccessToken

  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query)
  if (query.needAccessToken) delete query.needAccessToken

  axios({
    method: req.method,
    url: `${baseUrl}${path}`,
    params: Object.assign({}, req.body, {
      accesstoken: user.accessToken
    }),
    // data: Object.assign({}, req.body, {
    //   accesstoken: user.accessToken
    // }),
    // 有的请求是formData格式有的请求是application格式，这样cnode api都可以接收
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(resp => {
    console.log(resp, 'resprespresp')
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    console.log(err.response, 'errerrerrerr')
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
