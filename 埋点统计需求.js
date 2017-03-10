/*

涉及的功能：
1.统计最近14天开放平台SDK被初始化次数
· 需计算每天的访问量
2.统计最近24小时开放平台SDK被初始化次数
· 需计算每小时的访问量
3.统计初始化开放平台SDK次数前十的渠道（使用appID区分）
· 需计算每个渠道的总量
4.初始化开放平台次数前五的地区（使用IP区分）
· 需计算每个省（直辖市）的使用总量
5.网络类型百分比（使用netType）
· 需计算每种网络的使用总量
*/
{
	"initID": "uuid",
	"appID": "appID",
	"openID": "openID",
	"name": "INIT_DEVICE_INFO",
	"time": "yyyy-MM-dd hh:mm:ss",
	"IP": "10.10.10.10",
	"ip_location": {
		"area": "华东",
		"country": "中国",
		"city": "上海",
		"procine": "上海市",
		"latitude": "31.249",
		"procinceId": "310000",
		"countryId": "CN",
		"longitude": "121.487"
	},
	"message":{
		"ssid": "wifi-ssid",
		"netType": "WIFI",
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
}

{
	initID: uuid, // 本次初始化埋点SDK的ID
	appID: appID, // 渠道接入KEY，用于区分渠道
	openID: openID, // 开放平台openID
	name: 'INIT_DEVICE_INFO', // 埋点项“INIT_DEVICE_INFO”
	time: 'yyyy-MM-dd hh:mm:ss',
	IP: '10.10.10.10',
	message:{
		ssid: 'wifi-ssid', // 可无
		netType: 'WIFI', // 可无，2G/3G/4G/WIFI
		gps: {
			lat: 121.12, // 可无
			lon: 32.58, // 可无
			alt: 300 // 可无
		},
		carrier: 'China Mobile', // 可无
		motion: { // 可无
			s: 0, // 可无，速度，m/h
			a: 0, // 可无，加速度，m/s^2
			p: 0 // 可无，气压单位，Pa
		}
		deviceType: 'iOS', // iOS/Android/JS(iOS)/JS(Android)/JS(PC)
		OSVersion: '10',
		SDKVersion: '1.0'
	}
}


/*

涉及的功能：
1.统计最近14天开户次数
· 需计算每天的次数
2.统计最近14天支付次数
· 需计算每天的次数
3.统计最近14天投资次数
· 需计算每天的次数
4.统计最近14天融资次数
· 需计算每天的次数
*/

{
	initID: uuid, // 本次初始化埋点SDK的ID
	appID: appID, // 渠道接入KEY，用于区分渠道
	openID: openID, // 开放平台openID
	name: 'PAY_USER_CONSUMING', // 支付：PAY_USER_CONSUMING，申购：PURCHASE_USER_CONSUMING，融资：DEBIT_USER_CONSUMING，开户：ACCOUNT_USER_CONSUMING，充值：DEPOSIT_USER_CONSUMING
	time: 'yyyy-MM-dd hh:mm:ss',
	IP: '10.10.10.10',
	traceID: traceID, // 用于跟踪关联的埋点
	message:{
		status: 0, // start: 0, success: 1, cancel: 2
		bindCard: false // 是否包含绑卡，暂只需传入false
	}
}

/*

涉及的功能：
1.统计最近14天所有接口被调用的次数
· 需计算每天的调用次数
2.统计最近24小时所有接口被调用的次数
· 需计算每小时的调用次数
*/

{
	initID: uuid, // 本次初始化埋点SDK的ID
	appID: appID, // 渠道接入KEY，用于区分渠道
	openID: openID, // 开放平台openID
	name: 'API_'+接口名, // API_开头，后面跟具体接口名
	time: 'yyyy-MM-dd hh:mm:ss',
	IP: '10.10.10.10',
	traceID: traceID, // 用于跟踪关联的埋点
	message:{
		status: 0 // start: 0, success: 1, faild: 2
	}
}
