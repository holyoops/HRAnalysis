const Koa = require("koa");
const Serve = require('koa-static');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Cors = require('kcors');
const mongo = require('mongoskin');

const app = new Koa();
const serve = Serve('../Frontend/dist');
const router = new Router();
const bodyParser = BodyParser({
  onerror: function (err, ctx) {
    console.log('\n----------BodyParser ERROR start----------\nDate:',new Date().toLocaleString(),err,'\n----------BodyParser ERROR end----------');
    ctx.throw('body parse error', 422);
  }
});

const SendData2Kafka = require('./kafka.js');
const k = new SendData2Kafka(JSON.stringify({message:{newTest:'0221test01',_id:'id'}}));

const db = mongo.db('mongodb://10.128.166.43/logi_anal', {native_parser:true});
db.bind('front');

//db.front.remove({})
db.front.find().toArray(function(e, r) {
  console.log(r);
});



const originList = [
  'http://localhost:10262',
  'http://10.132.132.192:10262',
  'http://10.129.34.226:10262'
];

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
.post('/test', function (ctx, next) {
  console.log('\n----------api/test start----------\nDate:',new Date().toLocaleString(),'\ncontent:',ctx.request.body,'\norigin:',ctx.header.origin,'\n----------api/test end----------');
  return ctx.body = {test:'success'};
})
.post('/eventTrack', function (ctx, next) {
  console.log('\n----------api/eventTrack start----------\nDate:',new Date().toLocaleString(),'\ncontent:',ctx.request.body,'\norigin:',ctx.header.origin,'\n----------api/eventTrack end----------');
  return ctx.status = 204;
});

//app.use(router.middleware());
//app

app
.use(bodyParser)
.use(cors)
.use(router.routes())
.use(serve)
.listen(10261);
