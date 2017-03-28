const Koa = require("koa");
const Serve = require('koa-static');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Cors = require('kcors');
const mongo = require('mongoskin');
const SendData2Kafka = require('./kafka.js');
const http = require('http');
const log = require('./log.js');
const app = new Koa();
const serve = Serve('../Frontend/dist');
const router = new Router();
const bodyParser = BodyParser({
  onerror: function (err, ctx) {
    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('BodyParser ERROR', err, ctx.header.origin, clientIP);
    ctx.throw('body parse error', 422);
  }
});

const db = mongo.db('mongodb://10.128.166.43/logi_anal', {native_parser:true});
db.bind('front');

const originList = [
  'http://localhost:10262',
  'https://hop.hulubank.com.cn:1443',
  'https://hop.hulubank.com.cn:2443',
  'https://hop.hulubank.com.cn:443',
  'https://open.hulubank.com.cn',
  'https://hop.shrb.it'
];

let count = 0;

const cors = Cors({
  origin: (req) => {
    let origin = req.header.origin;
    if (originList.indexOf(origin) != -1){
      return origin;
    }
  },
  methods: 'OPTIONS, POST, GET, PUT, DELETE, PATCH',
  headers: 'Content-Type, Accept, Origin'});

  router
  .prefix('/api')
  .get('/test', function (ctx, next) {
    return ctx.body = {test:'success'};
  })
  .post('/eventTrack', function (ctx, next) {
    let body = ctx.request.body;
    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    const k = new SendData2Kafka(JSON.stringify(body));
    log('api/eventTrack', body, ctx.header.origin, clientIP);
    return ctx.status = 204;
  })
  .get('/getAll', async function(ctx, next){
    
    let body = ctx.request.body;
    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/eventTrack', body, ctx.header.origin, clientIP);
    function fetchDB() {
      return new Promise((resolve, reject) => {
        db.front.count({},function(e,r) {
            if (e) {
              reject(e);
            }else {
              resolve(r);
            }
        });
      });
    }
    await fetchDB().then((count) => {
      return ctx.body = {count: count};
    }).catch((error) => {
      return ctx.body = {errMsg: 'database error: ' + error}
    });

  })
  .get('/cleanData', function (ctx, next) {
    db.front.remove({})
    return ctx.body = {msg:'clean db success'};
  })
  .get('/fakeData', async function(ctx, next) {

      for (var i = 0; i < 10000; i++) {
        let data = {
          "initID": i + count,
          "appID": "appID",
          "openID": "openID",
          "name": "INIT_DEVICE_INFO",
          "time": "2017-01-0" + "11" + " 00:00:00",
          "IP": "10.10.10.10",
          "ip_location": {
            "area": "华东",
            "country": "中国",
            "city": "上海",
            "procine": "上海市",
            "latitude": "31.249",
            "procinceId": "310000",
            "countryId": "CN",
            "longitude": "121.487"
          },
          "message":{
            "ssid": "wifi-ssid",
            "netType": "WIFI",
            "gps": {
              "lat": 121.12,
              "lon": 32.58,
              "alt": 300
            },
            "carrier": "China Mobile",
            "motion": {
              "s": 0,
              "a": 0,
              "p": 0
            },
            "deviceType": "iOS",
            "OSVersion": "10",
            "SDKVersion": "1.0"
          }
        };
        await db.front.insert(data);
      }

    count = count + 10000;
    return ctx.body = {msg:'fake data success'};
  });

  //app.use(router.middleware());
  //app

  app
  .use(bodyParser)
  .use(cors)
  .use(router.routes())
  .use(serve)
  .listen(10261,'0.0.0.0');
