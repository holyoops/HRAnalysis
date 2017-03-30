const Koa = require("koa");
const Serve = require('koa-static');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Cors = require('kcors');
const mongo = require('mongoskin');
const log = require('./common/log.js');
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

  // 显示中间表所有数据
  .get('/getAllReport', async function(ctx, next){

    let body = ctx.request.body;
    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/eventTrack', body, ctx.header.origin, clientIP);
    function fetchDB() {
      return new Promise((resolve, reject) => {
        db.bind('front_report');
        db.front_report.find({}).toArray((e, r) => {
          if (e) {
            reject(e);
          }else {
            resolve(r);
          }
        });
      });
    }
    await fetchDB().then((count) => {
      return ctx.body = {data: count};
    }).catch((error) => {
      return ctx.body = {errMsg: 'database error: ' + error}
    });

  })

  // 获取数据库数据总量
  .get('/getAll', async function(ctx, next){

    let body = ctx.request.body;
    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/eventTrack', body, ctx.header.origin, clientIP);
    function fetchDB() {
      return new Promise((resolve, reject) => {
        db.bind('front');
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

  // 清空数据库
  .get('/cleanData', function (ctx, next) {
    db.bind('front');
    db.front.remove({})
    return ctx.body = {msg:'clean db success'};
  })

  // 数据库假数据
  .get('/fakeData', async function(ctx, next) {
    let successCount = 0;
    let errorCount = 0;

    function fetchDB(data) {

      db.bind('front');

      return new Promise((resolve, reject) => {

        db.front.insert(data, (e, r)=>{
          if (e) {
            reject(e);
          }else {
            resolve(r);
          }
        });
      });
    }

    for (var i = 0; i < 84000; i++) {

      let province;
      let netType;
      let day;
      let name;

      if (i < 1000) {
        province = "上海市";
        netType = "WIFI";
      }else if(i < 2000){
        province = "上海市";
        netType = "4G";
      }else if(i < 3000){
        province = "浙江省";
        netType = "WIFI";
      }else if(i < 4000){
        province = "浙江省";
        netType = "4G";
      }else if(i < 5000){
        province = "江苏省";
        netType = "WIFI";
      }else if(i < 6000){
        province = "江苏省";
        netType = "4G";
      }

      if (i < 6000) {
        day = "15";
      }else if (i < 12000) {
        day = "16";
      }else if (i < 18000) {
        day = "17";
      }else if (i < 24000) {
        day = "18";
      }else if (i < 30000) {
        day = "19";
      }else if (i < 36000) {
        day = "20";
      }else if (i < 42000) {
        day = "21";
      }else if (i < 48000) {
        day = "22";
      }else if (i < 54000) {
        day = "23";
      }else if (i < 60000) {
        day = "24";
      }else if (i < 66000) {
        day = "25";
      }else if (i < 72000) {
        day = "26";
      }else if (i < 78000) {
        day = "27";
      }else if (i < 84000) {
        day = "28";
      }

      let data = {
        "initID": i + count,
        "appID": "appID",
        "openID": "openID",
        "name": "INIT_DEVICE_INFO",
        "time": "2017-03-" + day + " 12:10:20",
        "IP": "10.10.10.10",
        "IPLocation": {
          "area":"华东",
          "country":"中国",
          "city":"宁波市",
          "province":province,
          "latitude":"30.189257122714",
          "procinceId":"330000",
          "countryId":"CN",
          "longitude":"121.33840825932"
        },
        "message":{
          "ssid": "wifi-ssid",
          "netType": netType,
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

      await fetchDB(data).then((r) => {
        successCount++;
        console.log(successCount);
      }).catch((error) => {
        errorCount++;
        console.log(error);
      });

    }

    return ctx.body = {
      successCount: successCount,
      errorCount: errorCount
    };

  });

  app
  .use(bodyParser)
  .use(cors)
  .use(router.routes())
  .use(serve)
  .listen(10269,'0.0.0.0');
