const __CONST = require('./common/const.js');
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

const ENV = process.argv.splice(2)[0];

switch (ENV) {
  case 'DEV':
    console.log('DEV');
    break;
  case 'SIT':
    console.log('SIT');
    break;

  default:

}

if (ENV === 'DEV') {
  console.log('DEV');
}else if (ENV === 'SIT') {
  console.log('SIT');
}else if (ENV === 'UAT') {
  console.log('UAT');
}else if (ENV === 'PRE_RELEASE') {
  console.log('PRE_RELEASE');
}else if (ENV === 'RELEASE') {
  console.log('RELEASE');
}else {
  console.log('环境配置错误，请检查启动参数（DEV/SIT/UAT/PRE_RELEASE/RELEASE）');
  process.exit();
}


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
  headers: 'Content-Type, Accept, Origin'
});

router
.prefix('/api')
.get('/test', function (ctx, next) {
  return ctx.body = {test:'success'};
})
.get('/getLastTwoWeeksData', function () {
  var today = new Date();
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
.get('/getUsersLocation', async (ctx, next) => {

  function fetchDB (){
    return new Promise((resolve, reject) => {

      db.bind('front_report_city');
      db.front_report_city.aggregate(
        [{
          $group: {
            _id: "$_id.province",
            value: {
              $sum: '$cnt'
            }
          }
        },
        {
          $sort: {
            value: 1
          }
        },
        {
          $limit: 5
        }], (e, r) => {
        if (e) {
          reject(e);
        }else{
          resolve(r);
        }
      });
    });
  }

  await fetchDB().then((data) => {

    let result = new Array();

    for (let d in data) {
      let r = {
        province: d._id,
        value: d.value
      }
      result.push(r);
    }

    return ctx.body = {
      data: result,
      error: null
    };

  }).catch((error) => {
    return ctx.body = {error: error};
  });

});

app
.use(bodyParser)
.use(cors)
.use(router.routes())
.use(serve)
.listen(10260,'0.0.0.0');
