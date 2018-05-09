var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')

var app = express()

var baseUrl = 'http://10.240.36.219:9000/point/v1/business/'

var proxyTable = {
  '/point/v1/business/getcaptcha': {
    target: baseUrl + 'getcaptcha',
    changeOrigin: true,
    pathRewrite: {
      '^/point/v1/business/getcaptcha': ''
    }
  },
  '/point/v1/business/regist': {
    target: baseUrl + 'regist',
    changeOrigin: true,
    pathRewrite: {
      '^/point/v1/business/regist': ''
    }
  }
}

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
      options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

app.use(express.static('src'))

var captchaCode = {
  code: 131002
};

app.post('/point/v1/business/getcaptcha', function(req, res) {
  setTimeout(function() {
   res.status(200);
   res.json(captchaCode);
 }, 3000)
});

var server = app.listen(3001, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Your webapp listening at http://%s:%s', host, port);
});