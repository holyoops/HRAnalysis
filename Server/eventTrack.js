// requires
const Koa = require("koa");
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Cors = require('kcors');
const SendData2Kafka = require('./common/kafka.js');
const log = require('./common/log.js');
const httpReq = require('./common/httpReq.js');

// const
const app = new Koa()
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

// COR LIST
const originList = [
  'http://localhost:10262',
  'https://hop.hulubank.com.cn:1443',
  'https://hop.hulubank.com.cn:2443',
  'https://hop.hulubank.com.cn:443',
  'https://open.hulubank.com.cn',
  'https://hop.shrb.it'
];

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
// 埋点接口
.post('/eventTrack', function (ctx, next) {
  let body = ctx.request.body;
  let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
  httpReq({
    channelName: 'qk',
    ip: clientIP//'125.111.255.255'
  },{
    hostname: '10.128.166.43',
    port: 9012,
    path: '/bqsIpCheck/ipCheck?',
    method: 'GET'
  }).then((r)=>{
    let IPInfo = JSON.parse(r);
    body.time = new Date().toLocaleString();
    if (IPInfo.isSuccess === 'true') {
      body.IPLocation = IPInfo.body.resultData.ipcountryDetail;
    }else{
      body.IPLocation = {};
    }
    log('api/eventTrack', body, ctx.header.origin, clientIP);
    const k = new SendData2Kafka(JSON.stringify(body));
  }).catch((e)=>{
    console.log(e);
  });

  return ctx.status = 204;
});

app
.use(bodyParser)
.use(cors)
.use(router.routes())
.listen(10261,'0.0.0.0');
