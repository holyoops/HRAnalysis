const Koa = require("koa");
const Serve = require('koa-static');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Cors = require('kcors');
const mongo = require('mongoskin');
const log = require('./common/log.js');
const uuid = require('node-uuid');
const app = new Koa();
const serve = Serve('../Frontend/dist');
const router = new Router();
const logger = require('koa-logger');

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
    headers: 'Content-Type, Accept, Origin'
});

router
.prefix('/api')
.get('/test', function (ctx, next) {
    return ctx.body = {test:'success'};
})

// 显示中间表所有数据总量
.get('/getAllReportCount', async function(ctx, next){

    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/getAllReportCount', '', ctx.header.origin, clientIP);
    function fetchDB() {
        return new Promise((resolve, reject) => {
            db.bind('front_report');
            db.front_report.count({}, (e, r) => {
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

// 显示中间表所有数据
.get('/getAllReport', async function(ctx, next){

    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/getAllReport', '', ctx.header.origin, clientIP);
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
    await fetchDB().then((data) => {
        return ctx.body = {data: data};
    }).catch((error) => {
        return ctx.body = {errMsg: 'database error: ' + error}
    });

})

// 显示中间表_city所有数据总量
.get('/getAllReportCityCount', async function(ctx, next){

    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/getAllReportCityCount', '', ctx.header.origin, clientIP);
    function fetchDB() {
        return new Promise((resolve, reject) => {
            db.bind('front_report_city');
            db.front_report_city.count({}, (e, r) => {
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

// 显示中间表所有数据
.get('/getAllReportCity', async function(ctx, next){

    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/getAllReportCity', '', ctx.header.origin, clientIP);
    function fetchDB() {
        return new Promise((resolve, reject) => {
            db.bind('front_report_city');
            db.front_report_city.find({}).toArray((e, r) => {
                if (e) {
                    reject(e);
                }else {
                    resolve(r);
                }
            });
        });
    }
    await fetchDB().then((data) => {
        return ctx.body = {data: data};
    }).catch((error) => {
        return ctx.body = {errMsg: 'database error: ' + error}
    });

})

// 获取数据库数据总量
.get('/getAllCount', async function(ctx, next){

    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/getAllCount', '', ctx.header.origin, clientIP);
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

// 获取数据库数据
.get('/getAll', async function(ctx, next){

    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/getAll', '', ctx.header.origin, clientIP);
    function fetchDB() {
        return new Promise((resolve, reject) => {
            db.bind('front');
            db.front.find({}).toArray((e, r) => {
                if (e) {
                    reject(e);
                }else {
                    resolve(r);
                }
            });
        });
    }
    await fetchDB().then((data) => {
        return ctx.body = {data: data};
    }).catch((error) => {
        return ctx.body = {errMsg: 'database error: ' + error}
    });

})

// 清空数据库db.bind('front_report_city');
.get('/cleanData', async function (ctx, next) {

    db.bind('front');
    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/cleanData', '', ctx.header.origin, clientIP);
    function fetchDB(){
        return new Promise((resolve, reject) => {
            db.front.remove({},(e, r) => {
                if (e){
                    reject(e);
                }else {
                    resolve(r);
                }
            });
        });
    }

    await fetchDB().then((r) => {
        return ctx.body = {msg:'clean db success: '+r};
    }).catch((e) => {
        return ctx.body = {msg:'clean db error: '+e};
    });

})

.get('/cleanAllData', async function (ctx, next) {


    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/cleanAllData', '', ctx.header.origin, clientIP);
    function fetchDBCity(){
        db.bind('front_report_city');
        return new Promise((resolve, reject) => {
            db.front_report_city.remove({},(e, r) => {
                if (e){
                    reject(e);
                }else {
                    resolve(r);
                }
            });
        });
    }
    function fetchDB(){
        db.bind('front_report');
        return new Promise((resolve, reject) => {
            db.front_report.remove({},(e, r) => {
                if (e){
                    reject(e);
                }else {
                    resolve(r);
                }
            });
        });
    }
    await fetchDB().then((r) => {
    }).catch((e) => {
        return ctx.body = {msg:'clean db error: '+e};
    });

    await fetchDBCity().then((r) => {
    }).catch((e) => {
        return ctx.body = {msg:'clean db error: '+e};
    });

    return ctx.body = {msg:'clean db success'};

})

// 数据库假数据
.get('/fakeData', async function(ctx, next) {

    let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    log('api/fakeData', '', ctx.header.origin, clientIP);
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

    let dataList = new Array();

    for (var i = 0; i < 100; i++) {

        let provinceList = [
            '上海市',
            '浙江省',
            '江苏省',
            '北京市',
            '重庆市',
            '香港特别行政区',
            '江西省',
            '新疆维吾尔自治区'
        ];
        let netTypeList = [
            'WIFI',
            '4G',
            '3G',
            '2G'
        ];
        let nameList = [
            'INIT_DEVICE_INFO',
            'APPROVE_CONSUMING',
            'LOGIN_CONSUMING',
            'PAY_USER_CONSUMING',
            'PURCHASE_USER_CONSUMING',
            'DEBIT_USER_CONSUMING',
            'ACCOUNT_USER_CONSUMING',
            'DEPOSIT_USER_CONSUMING',
            'WITHDRAW_USER_CONSUMING',
            'PURCHASE_PAGE_LOAD',
            'DEBIT_PAGE_LOAD',
            'ACCOUNT_PAGE_LOAD',
            'CREATE_ACCOUNT_SUCCESS'
        ];
        let appIDList = [
            '575773de-9d65-4e60-abf9-e6fadda9dfbf',
            'cj48f4f4-nerv-nv4v-cmq0-cmaw4jnc4jv4',
            '3fn43fn4-43jf-j34v-4nv4-qjv490jv0jr5',
            '23f9j4f4-fj39-qvn3-vq44-qq23klmfpqqw',
            '32ri43gf-sxef-qwj4-qw4f-4v4v4q04fmq4',
            '34340fcv-qcex-4cm3-k093-ckq349cvkvq0',
            'ce494043-amcs-4mqc-cv4w-kq93bq234557',
            '3rnf4f44-134v-m039-qj93-qvn843zz9x23',
            '3q40cq04-99XJ-sj9v-a4q3-0q3pjvqmnakp',
            'cq34v423-43v4-42v3-cq34-c3rmvo4tvovj',
            '409uj039-cj98-09ec-mwncn394fj50ck067',
            'qj0394q9-1n34-783x-ednimoe9081390942'
        ];
        let openIDList = [
            [
                'RBQ9I9n4WQPZyBjY/1pUKg==',
                'H38fujdscuhcj392309f33==',
                'rgvw45gvw4tb5wtbtbbw45==',
                'ergvw45hw45hgw45hw4hw4==',
                'UYG3490rj39v34j09J0df3=='
            ],
            [
                '3gv25b262452546t/1pUKg==',
                'H3q44ds3445cj392309f33==',
                'rg444qtvw4tb5wtbtbbw45==',
                'evavw45hwh445ywyhw4hw4==',
                'UYG3413514524g5g5J0df3=='
            ],
            [
                'RBQ5t6253g25yBjY/1pUKg==',
                'g45t25g245g245g2309f33==',
                'rgvw45gvw52g5g245t25t2==',
                'er25t2gv5tg25tg24w4hw4==',
                'Uq34tq34gqg554j09J0df3=='
            ],
            [
                'wetwrgqertqtr4t3t4pUKg==',
                '5t34fqbv56jh56jh569f33==',
                'rgvw4q4trq3gv35g55bw45==',
                'ergvwe6e6hje65j5hw4hw4==',
                'UY6e65ue6uye65j09J0df3=='
            ],
            [
                'R5w4bw45tgq34tfqrvqrev==',
                'H38ergv7eqrgj392309f33==',
                'rgv5hbrtnbzthrgbtbbw45==',
                'ergaetraethggw45hw4hw4==',
                'UYG3490rj36uwsnysy0df3=='
            ],
            [
                'RBQw45ha455ZyBjY/1pUKg==',
                'H38fujd6545yw56h666f33==',
                'rg6w5hw65y6yw6tbtbbw45==',
                'ergvw45hw45hgw6yw46yw4==',
                'U65756yw56ywe4j09J0df3=='
            ],
            [
                'RB5q4tqhqQPZyBjY/1pUKg==',
                'Hz80ylte56ucj392309f33==',
                'rgvw45gve65FIOUIDTYNad==',
                'ergvw45strshgw45hw4hw4==',
                'eWFRwerewrCE34j09J0df3=='
            ],
            [
                'wetwr323f44455t3t4pUKg==',
                '5yw6yw6yw6yh56jh569f33==',
                'rgvw4q4y3w6yw6yw6y2556==',
                'erge6e6hje6636y3563654==',
                'UY6e65u65ay56yj09J0df3=='
            ],
            [
                '6y6y6y6y6h65hy6qrvqrev==',
                'H356ya56a56ya666309f33==',
                'rgv5476hus6yhrgbtbbw45==',
                'e7uij67ue67ue745hw4hw4==',
                'Ure67jyhz56uwsnysy0df3=='
            ],
            [
                'RBQsrgbartgatta331pUKg==',
                'H38fujdVGRGVRrgr666f33==',
                'rgreagaergaebvtbtbbw45==',
                'ergvwryumyrmr7jrtmytw4==',
                'U657eyetrhbazr5w5555qw=='
            ],
            [
                'RB5q4tqhqQPZyBjY/1pUKg==',
                'Hz80ylte56ucj392309f33==',
                'rgvwc4rfvb344422DTYNad==',
                'erq34t3gf3444w45hw4hw4==',
                '3rdfga32rfqwfwqf9J0df3=='
            ],
            [
                '4gfv345g45t2354t2345Kg==',
                'Hz80y435234tgt92309f33==',
                'rgvwc4rf2ewfe4r432323d==',
                'erq34t3gq34vqBVRRw4hw4==',
                '3rdfga32DFEf24R39J0df3=='
            ]
        ];

        let nameRandom = Math.floor(Math.random() * nameList.length);
        let provinceRandom = Math.floor(Math.random() * provinceList.length);
        let netTypeRandom = Math.floor(Math.random() * netTypeList.length);
        let appIDRandom = Math.floor(Math.random() * appIDList.length);
        let openIDRandom = Math.floor(Math.random() * openIDList[appIDRandom].length);

        let time = (Math.floor(Math.random() * 24));
        if (time < 10) {
            time = '0' + time;
        }else {
            time = time + '';
        }
        // (Math.floor(Math.random() * 15) + 15)
        let today = new Date();
        let date = new Date(today);
        date.setDate(today.getDate() - Math.floor(Math.random() * 15));

        let day = date.getDate() + '';
        if (day < 10) {
            day = '0' + day;
        }

        let data = {
            "_id": uuid.v1(),
            "initID": i + count,
            "appID": appIDList[appIDRandom],
            "openID": openIDList[appIDRandom][openIDRandom],
            "name": nameList[nameRandom],
            "time": "2017-04-" + "10" + " "+ time +":10:20",
            "IP": "10.10.10.10",
            "IPLocation": {
                "area":"华东",
                "country":"中国",
                "city":"宁波市",
                "province":provinceList[provinceRandom],
                "latitude":"30.189257122714",
                "procinceId":"330000",
                "countryId":"CN",
                "longitude":"121.33840825932"
            },
            "message":{
                "ssid": "wifi-ssid",
                "netType": netTypeList[netTypeRandom],
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

        dataList.push(data);
    }



    await fetchDB(dataList).then((r) => {
        return ctx.body = {
            successCount: r.insertedCount
        };
    }).catch((error) => {
        return ctx.body = {
            error: error
        };
    });



})
.put('/fuckPut', async function (ctx, next) {
    function fetchDB(){

        return new Promise((resolve, reject) => {

                if (e){
                    reject(e);
                }else {
                    resolve(ctx.body);
                }

        });
    }
    await fetchDB().then((r) => {
    }).catch((e) => {
        return ctx.body = {msg:'clean db error: '+e};
    });
    return ctx.body = {msg: ctx.body};

})
;

app
.use(bodyParser)
.use(logger())
.use(cors)
.use(router.routes())
.use(serve)
.listen(10269,'0.0.0.0',() => {
    console.log('fakeData.js started @ip:10269');
});
