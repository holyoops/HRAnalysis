const Koa = require("koa");
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Cors = require('kcors');
const SendData2Kafka = require('./common/kafka.js');
const log = require('./common/log.js');
const app = new Koa()
const router = new Router();
const bodyParser = BodyParser({
  onerror: function (err, ctx) {
    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('BodyParser ERROR', err, ctx.header.origin, clientIP);
    ctx.throw('body parse error', 422);
  }
});

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
  headers: 'Content-Type, Accept, Origin'
});

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
});

app
.use(bodyParser)
.use(cors)
.use(router.routes())
.listen(10261,'0.0.0.0');



// let successCount = 0;
// let errorCount = 0;
//
// function fetchDB(data) {
//
//   return new Promise((resolve, reject) => {
//
//     db.bind('front');
//     db.front.insert(data, (e, r)=>{
//       if (e) {
//         reject(e);
//       }else {
//         resolve(r);
//       }
//     });
//   });
// }
//
// for (var i = 0; i < 10000; i++) {
//   let data = {
//     "initID": i + count,
//     "appID": "appID",
//     "openID": "openID",
//     "name": "INIT_DEVICE_INFO",
//     "time": "2017-04-" + "02" + " 12:10:20",
//     "IP": "10.10.10.10",
//     "IPLocation": {
//       "area":"华东",
//       "country":"中国",
//       "city":"宁波市",
//       "procince":"浙江省",
//       "latitude":"30.189257122714",
//       "procinceId":"330000",
//       "countryId":"CN",
//       "longitude":"121.33840825932"
//     },
//     "message":{
//       "ssid": "wifi-ssid",
//       "netType": "4G",
//       "gps": {
//         "lat": 121.12,
//         "lon": 32.58,
//         "alt": 300
//       },
//       "carrier": "China Mobile",
//       "motion": {
//         "s": 0,
//         "a": 0,
//         "p": 0
//       },
//       "deviceType": "iOS",
//       "OSVersion": "10",
//       "SDKVersion": "1.0"
//     }
//   };
//
//   await fetchDB(data).then((r) => {
//     successCount++;
//     console.log(successCount);
//   }).catch((error) => {
//     errorCount++;
//     console.log(error);
//   });
//
// }
//
// return ctx.body = {
//   successCount: successCount,
//   errorCount: errorCount
// };
