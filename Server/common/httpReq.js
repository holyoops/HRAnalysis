const http = require('http');
const qs = require('querystring');

module.exports = function (d, o){

  let data = d;
  let options = o;
  let content = qs.stringify(data);
  options.path = options.path + content;

  return new Promise((resolve, reject) => {

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (result) {
            resolve(result);
        });
    });

    req.on('error', function (e) {
        reject(e);
    });

    req.end();

  });


}
