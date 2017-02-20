const Koa = require("koa");
const Serve = require('koa-static');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Cors = require('kcors');

const app = new Koa();
const serve = Serve('../Frontend/dist');
const router = new Router();
const bodyParser = BodyParser({
  onerror: function (err, ctx) {
    console.log(err);
    ctx.throw('body parse error', 422);
  }
});

const originList = [
  'http://localhost:3301',
  'http://localhost:3302',
  'http://localhost:3303'
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
.post('/todo_list', function (ctx, next) {
  console.log(ctx.request.body);
  return ctx.body = {test:'hoooly shiiiiiiiit!!!!'};
});

//app.use(router.middleware());
//app

app
.use(bodyParser)
.use(cors)
.use(router.routes())
.use(serve)
.listen(3301, _ => {
  console.log('server started')
});
