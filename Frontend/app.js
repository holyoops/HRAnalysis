var express = require('express');
var app = express();
app.use(express.static('dist'));

app.get('/', function(req, res) {
   res.sendfile('./dist/index.html');
});

var server = app.listen(3302, function () {
  var host = server.address().address;
  var port = server.address().port;
});
