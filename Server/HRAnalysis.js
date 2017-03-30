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
            console.log(r);
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
  .get('/totalCount2Week', function () {
    var today = new Date();
    console.log(today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate());
    var date = new Date(today);
    date.setDate(today.getDate()-1);
    var times = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    console.log(times);
    let data = {
      data : [
        {date: '1月05日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月06日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月07日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月08日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月09日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月10日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月11日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月12日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月13日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月14日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月15日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月16日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月17日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
        {date: '1月18日', func: Math.random().toFixed(3)*2000, SDK: Math.random().toFixed(3)*2000},
      ]
    }
    return {
      today: today,
      date: date
    };
  })
  .get('/getUsersLocation', function (ctx, next) {

    var data = [
      {name:"北京",value:1},
      {name:"上海",value:50},
      {name:"天津",value:3},
      {name:"重庆",value:4},
      {name:"黑龙江",value:2},
      {name:"吉林",value:1},
      {name:"辽宁",value:1},
      {name:"内蒙古",value:0},
      {name:"河北",value:0},
      {name:"山西",value:0},
      {name:"山东",value:0},
      {name:"河南",value:0},
      {name:"陕西",value:0},
      {name:"甘肃",value:0},
      {name:"宁夏",value:0},
      {name:"青海",value:0},
      {name:"新疆",value:0},
      {name:"安徽",value:0},
      {name:"江苏",value:0},
      {name:"浙江",value:0},
      {name:"湖南",value:0},
      {name:"江西",value:0},
      {name:"河北",value:0},
      {name:"四川",value:0},
      {name:"贵州",value:0},
      {name:"福建",value:0},
      {name:"台湾",value:0},
      {name:"广东",value:0},
      {name:"海南",value:0},
      {name:"广西",value:0},
      {name:"云南",value:0},
      {name:"西藏",value:0},
      {name:"香港",value:0},
      {name:"澳门",value:0}
    ];

    return ctx.body = {data: data};

  })
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
  .get('/cleanData', function (ctx, next) {
    db.bind('front');
    db.front.remove({})
    return ctx.body = {msg:'clean db success'};
  })
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
  .listen(10260,'0.0.0.0');
