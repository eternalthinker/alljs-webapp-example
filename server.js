var path = require('path');

process.chdir(path.join(__dirname, '.'));

var http = require('http');
var https = require('https');
var fs = require('fs');
var express =  require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require("serve-favicon");

var app = express();
var httpServer = http.createServer(app);
app.set('case sensitive routing', true);
app.use(compression());
// app.use(favicon('client/_build/assets/favicon.ico'));
app.use('/assets', express.static('client/_build/assets'));

app.get('/', function(req, res, next) {
  res.sendFile("client/_build/layout.html", {
    root: __dirname
  }, function(err) {
    if (err) {
      console.log("error:", err);
      next(err);
    }
  });
});

var port = 4001;
httpServer.listen(port, function () {
  console.log("Express http server listening on port " + port);
});

