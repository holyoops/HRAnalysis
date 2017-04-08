// requires
const Koa = require("koa");
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Cors = require('kcors');
const SendData2Kafka = require('./common/kafka.js');
const log = require('./common/log.js');
const httpReq = require('./common/httpReq.js');
const __GLOBAL = require('./common/const.js');
// const
const app = new Koa()
const router = new Router();
const logger = require('koa-logger')

const bodyParser = BodyParser({
    onerror: function (err, ctx) {
        let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
        log('BodyParser ERROR', err, ctx.header.origin, clientIP);
        ctx.throw('body parse error', 422);
    }
});

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
        channelName: __GLOBAL('BQS_CN'),
        ip: clientIP
    },{
        hostname: __GLOBAL('BQS_IP'),
        port: __GLOBAL('BQS_PORT'),
        path: __GLOBAL('BQS_PATH'),
        method: 'GET'
    }).then((r)=>{

        let IPInfo = JSON.parse(r);
        let today = new Date();
        let m = today.getMonth() + 1 + '';
        if ( m < 10 ) {
            m = '0' + m;
        }
        let d = today.getDate() + '';
        if ( d < 10 ) {
            d = '0' + d;
        }
        let h = today.getHours() + '';
        if ( h < 10 ) {
            h = '0' + h;
        }
        let mi = today.getMinutes() + '';
        if ( mi < 10 ) {
            mi = '0' + mi;
        }
        let s = today.getSeconds() + '';
        if ( s < 10 ) {
            s = '0' + s;
        }
        let milli = today.getMilliseconds() + '';
        if ( milli < 10 ) {
            milli = '0' + milli;
        }
        let time = today.getFullYear() + "-" + m + "-" + d + ' ' + h + ':' + s + ':' + mi + ':' + milli;

        body.time = time;
        if (IPInfo.body.resultData.isSuccess === 'true') {
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
.use(logger())
.use(router.routes())
.listen(10261,'0.0.0.0',() => {
    console.log('eventTrack.js started @ip:10261');
});
