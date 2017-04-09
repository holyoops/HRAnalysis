const __GLOBAL = require('./common/const.js');
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
const logger = require('koa-logger')

const bodyParser = BodyParser({
    onerror: function (err, ctx) {
        let clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
        log('BodyParser ERROR', err, ctx.header.origin, clientIP);
        ctx.throw('body parse error', 422);
    }
});

const db = mongo.db(__GLOBAL('MONGODB_URL')+__GLOBAL('MONGODB_NAME'),{native_parser:true});

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
.prefix('/analysis')
.get('/test', function (ctx, next) {
    return ctx.body = {test:'success'};
})
.get('/getLastTwoWeeksData', async function (ctx, next) {

    let today = new Date();
    let daysRegExp = '';
    let othersList;
    let initList;
    let result = [];

    for (let i = 1; i < 15; i++) {
        let date = new Date(today);
        date.setDate(today.getDate()-i);
        let m = date.getMonth() + 1 + '';
        if ( m < 10 ) {
            m = '0' + m;
        }
        let d = date.getDate() + '';
        if ( d < 10 ) {
            d = '0' + d;
        }
        let day = date.getFullYear() + "-" + m + "-" + d;
        daysRegExp = daysRegExp + day + ((i === 14) ? '' : '|') ;

        result.push({
            date: day,
            formatedDate: m + '月' + d + '日',
            othersCount: 0,
            SDKInitCount: 0
        });
    }

    function fetchDB (date, type){
        return new Promise((resolve, reject) => {

            let r = new RegExp('(' + date + ')');
            let match;
            if (type === 'others') {
                match = {'_id.time' : r, '_id.name': {$nin: ['INIT_DEVICE_INFO','PURCHASE_PAGE_LOAD','DEBIT_PAGE_LOAD','ACCOUNT_PAGE_LOAD','CREATE_ACCOUNT_SUCCESS']}};
            }else if (type === 'init'){
                match = {'_id.time' : r, '_id.name': 'INIT_DEVICE_INFO'};
            }else if (type === 'pay'){
                match = {'_id.time' : r, '_id.name': 'PAY_USER_CONSUMING'};
            }else if (type === 'purchase'){
                match = {'_id.time' : r, '_id.name': 'PURCHASE_USER_CONSUMING'};
            }else if (type === 'debit'){
                match = {'_id.time' : r, '_id.name': 'DEBIT_USER_CONSUMING'};
            }else if (type === 'openAccount'){
                match = {'_id.time' : r, '_id.name': 'CREATE_ACCOUNT_SUCCESS'};
            }
            db.bind('front_report');
            db.front_report.aggregate([
                {$match: match},
                {$project: {'_id.name': 1, '_id.time':{$substr: [ "$_id.time", 0, 10]}, cnt: 1}},
                {$group: {_id: {time:'$_id.time'},value: {$sum: '$cnt'}}},
                {$sort: {'_id.time': 1}}
            ],
            (error, result) => {
                if (error) {
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    }

    await fetchDB(daysRegExp, 'others').then((r) => {

        for (let i in result) {
            i = parseInt(i);
            for (let j in r) {
                j = parseInt(j);
                if (r[j]._id.time === result[i].date) {
                    result[i].othersCount = r[j].value;
                }
            }
        }
    }).catch((e) => {
        return ctx.body = {
            data: result.reverse(),
            errorCode: e
        };
    });

    await fetchDB(daysRegExp, 'init').then((r) => {
        for (let i in result) {
            i = parseInt(i);
            for (let j in r) {
                j = parseInt(j);
                if (r[j]._id.time === result[i].date) {
                    result[i].SDKInitCount = r[j].value;
                }
            }
        }
    }).catch((e) => {
        return ctx.body = {
            data: result.reverse(),
            errorCode: e
        };
    });

    if (ctx.query.type === 'business') {
        await fetchDB(daysRegExp, 'openAccount').then((r) => {
            for (let i in result) {
                i = parseInt(i);
                for (let j in r) {
                    j = parseInt(j);
                    if (r[j]._id.time === result[i].date) {
                        result[i].openAccountCount = r[j].value;
                    }
                }
            }
        }).catch((e) => {
            return ctx.body = {
                data: result.reverse(),
                errorCode: e
            };
        });

        await fetchDB(daysRegExp, 'purchase').then((r) => {
            for (let i in result) {
                i = parseInt(i);
                for (let j in r) {
                    j = parseInt(j);
                    if (r[j]._id.time === result[i].date) {
                        result[i].purchaseCount = r[j].value;
                    }
                }
            }
        }).catch((e) => {
            return ctx.body = {
                data: result.reverse(),
                errorCode: e
            };
        });

        await fetchDB(daysRegExp, 'debit').then((r) => {
            for (let i in result) {
                i = parseInt(i);
                for (let j in r) {
                    j = parseInt(j);
                    if (r[j]._id.time === result[i].date) {
                        result[i].debitCount = r[j].value;
                    }
                }
            }
        }).catch((e) => {
            return ctx.body = {
                data: result.reverse(),
                errorCode: e
            };
        });

        await fetchDB(daysRegExp, 'pay').then((r) => {
            for (let i in result) {
                i = parseInt(i);
                for (let j in r) {
                    j = parseInt(j);
                    if (r[j]._id.time === result[i].date) {
                        result[i].payCount = r[j].value;
                    }
                }
            }
        }).catch((e) => {
            return ctx.body = {
                data: result.reverse(),
                errorCode: e
            };
        });
    }

    return ctx.body = {
        data: result.reverse(),
        errorCode: null
    };
})
.get('/getLast12HoursData', async function (ctx, next) {

    let today = new Date();
    let daysRegExp = '';
    let othersList;
    let initList;
    let result = [];

    let maxOthersCount = 0;
    let maxInitCount = 0;

    let sumOthersCount = 0;
    let sumInitCount = 0;

    for (let i = 1; i < 13; i++) {
        let date = new Date(today);
        date.setHours(today.getHours()-i);
        let m = date.getMonth() + 1;
        if ( m < 10 ) {
            m = '0' + m;
        }
        m = m + '';
        let d = date.getDate();
        if ( d < 10 ) {
            d = '0' + d;
        }
        d = d + '';
        let h = date.getHours();
        let hour = h;
        if ( h < 10 ) {
            h = '0' + h;
        }
        h = h + '';
        let day = date.getFullYear() + '-' + m + '-' + d + ' ' + h;
        daysRegExp = daysRegExp + day + ((i === 12) ? '' : '|') ;

        result.push({
            date: day,
            hour: ( hour ) + '点~' + ( hour + 1 )  + '点',
            othersCount: 0,
            SDKInitCount: 0
        });
    }

    function fetchDB (date, type){
        return new Promise((resolve, reject) => {

            let r = new RegExp('(' + date + ')');
            let match;
            if (type === 'others') {
                match = {'_id.time' : r, '_id.name': {$ne: 'INIT_DEVICE_INFO'}};
            }else{
                match = {'_id.time' : r, '_id.name': 'INIT_DEVICE_INFO'};
            }
            db.bind('front_report');
            db.front_report.aggregate([
                {$match: match},
                {$group: {_id: {time:'$_id.time'},value: {$sum: '$cnt'}}},
                {$sort: {'_id.time': 1}}
            ],
            (error, result) => {
                if (error) {
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    }

    await fetchDB(daysRegExp, 'others').then((r) => {
        for (let i in result) {
            i = parseInt(i);
            for (let j in r) {
                j = parseInt(j);
                maxOthersCount = ( maxOthersCount < r[j].value ) ? r[j].value : maxOthersCount;
                if (i === 0) {
                    sumOthersCount = sumOthersCount + r[j].value;
                }
                if (r[j]._id.time === result[i].date) {
                    result[i].othersCount = r[j].value;
                }
            }
        }
    }).catch((e) => {
        return ctx.body = {
            data: result,
            maxInitCount: maxInitCount,
            maxOthersCount: maxOthersCount,
            sumInitCount: sumInitCount,
            sumOthersCount: sumOthersCount,
            errorCode: e
        };
    });

    await fetchDB(daysRegExp, 'init').then((r) => {
        for (let i in result) {
            i = parseInt(i);
            for (let j in r) {
                j = parseInt(j);
                maxInitCount = ( maxInitCount < r[j].value ) ? r[j].value : maxInitCount;
                if (i === 0) {
                    sumInitCount = sumInitCount + r[j].value;
                }
                if (r[j]._id.time === result[i].date) {
                    result[i].SDKInitCount = r[j].value;
                }
            }
        }
    }).catch((e) => {
        return ctx.body = {
            data: result,
            maxInitCount: maxInitCount,
            maxOthersCount: maxOthersCount,
            sumInitSDKCount: sumInitSDKCount,
            sumOthersCount: sumOthersCount,
            errorCode: e
        };
    });

    let max = ( maxOthersCount > maxInitCount ) ?  maxOthersCount : maxInitCount;

    for (let i in result) {
        i = parseInt(i);
        let percentOthers = ( ( result[i].othersCount / max ) * 100 ).toFixed(0) + '%';
        let percentInit = ( ( result[i].SDKInitCount / max ) * 100 ).toFixed(0) + '%';
        result[i].othersStyle = {
            height: percentOthers
        };
        result[i].SDKInitStyle = {
            height: percentInit
        }
    }

    return ctx.body = {
        data: result.reverse(),
        maxInitCount: maxInitCount,
        maxOthersCount: maxOthersCount,
        sumInitCount: sumInitCount,
        sumOthersCount: sumOthersCount,
        errorCode: null
    };
})
.get('/getUsersLocation', async (ctx, next) => {

    function fetchDB (){
        return new Promise((resolve, reject) => {
            db.bind('front_report_city');
            db.front_report_city.aggregate([
                {$group: {_id: "$_id.province",value: {$sum: '$cnt'}}},
                {$sort: {value: 1}},
                {$limit: 5}
            ],
            (error, result) => {
                if (error) {
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    }

    await fetchDB().then((data) => {

        let result = new Array();
        let sumValue = 0;
        let maxValue = 0;
        for (let i in data) {
            i = parseInt(i);
            maxValue = (maxValue < data[i].value) ? data[i].value : maxValue;
            let r = {
                province: data[i]._id,
                value: data[i].value
            }
            sumValue = sumValue + data[i].value;
            result.push(r);
        }

        return ctx.body = {
            data: result,
            maxValue: maxValue,
            sumValue: sumValue,
            errorCode: null
        };

    }).catch((error) => {
        return ctx.body = {
            data: [],
            maxValue: 0,
            sumValue: 0,
            errorCode: error
        };
    });

})
.get('/getChannelData', async (ctx, next) => {

    let result = new Array();
    for (let i = 1; i < 11; i++) {
        let data = {
            rank: i,
            appID: '',
            openAccountCount: 0,
            initCount: 0,
            payCount: 0,
            debitCount: 0,
            purchaseCount: 0
        }
        result.push(data);
    }

    function fetchDB (){
        return new Promise((resolve, reject) => {
            db.bind('front_report');
            db.front_report.aggregate([
                {$match: {'_id.name': 'CREATE_ACCOUNT_SUCCESS'}},
                {$group: {_id: {appID: '$_id.appID'},value: {$sum: '$cnt'}}},
                {$sort: {value: -1}},
                {$limit: 10}
            ],
            (error, result) => {
                if (error) {
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    }

    await fetchDB().then((r) => {
        for (let i in result) {
            i = parseInt(i);
            if (i < r.length) {
                result[i].openAccountCount = r[i].value;
                result[i].appID = r[i]._id.appID
            }else {
                continue;
            }
        }

        return ctx.body = {
            data: result,
            errorCode: null
        };

    }).catch((error) => {
        return ctx.body = {data: [], errorCode: error};
    });

});

app
.use(logger())
.use(bodyParser)
.use(cors)
.use(router.routes())
.use(serve)
.listen(10260,'0.0.0.0',() => {
    console.log('HRAnalysis.js started @ip:10260');
});
