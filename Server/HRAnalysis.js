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
db.bind('front_report');

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

});

app
.use(bodyParser)
.use(cors)
.use(router.routes())
.use(serve)
.listen(10260,'0.0.0.0');
