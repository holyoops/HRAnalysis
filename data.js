// --------- HRAnalysis SDK 开发者调用

HRAnalysis.init({
  appID: appID,
  openID: openID,
  initID:  uuid// 本次初始化埋点SDK的ID
}) => {
  return initID
};

HRAnalysis.eventTrack({
    name:'name',
    traceID: 'traceID', // 开发者自定义传入，同一个traceID可关联多个事件
    message:{

    }
});


// --------- HRAnalysis SDK 定义

{
  initID: uuid, // 本次初始化埋点SDK的ID
  name:'name',
  appID: appID,
  openID: openID, // 开放平台openID
  traceID: traceID,
  message: message
}

// --------- HRAnalysis 数据库
{
  initID: uuid, // 本次初始化埋点SDK的ID
  eventID: uuid,
  timestamp: yyyymmddhhmmss,
  name:'name',
  appID: appID,
  openID: openID, // 开放平台openID
  traceID: traceID,
  message: message
}

// ----------- 开放平台SDK埋点
HRAnalysis.eventTrack({
    name:'DEVICE_INFO',
    message:{
      ssid: 'wifi-ssid', //
      netType: 'WIFI', // 2G/3G/4G/WIFI
      gps: {
        lat: 121.12,
        lon: 32.58,
        alt: 300
      },
      carrier: 'China Mobile',
      motion: {
        s: 0, // 速度，m/h
        a: 0, // 加速度，m/s^2
        p: 0 // 气压单位，Pa
      }
      deviceType: 'iOS', // iOS/Android/JS(iOS)/JS(Android)/JS(PC)
      OSVersion: '10',
      userAgent: ''
    }
});

HRAnalysis.eventTrack({
    name:'PAY_USER_CONSUMING', // 支付：PAY_USER_CONSUMING，申购：PURCHASE_USER_CONSUMING，融资：DEBIT_USER_CONSUMING，开户：ACCOUNT_USER_CONSUMING，充值：DEPOSIT_USER_CONSUMING
    message:{
      status: 0 // start: 0, success: 1, cancel: 2
    },
    bindCard: false, // 是否包含绑卡，暂只需传入false
    traceID: traceID
});

HRAnalysis.eventTrack({
    name:'PAY_PAGE_LOAD', // 支付：PAY_PAGE_LOAD，申购：PURCHASE_PAGE_LOAD，融资：DEBIT_PAGE_LOAD，开户：ACCOUNT_PAGE_LOAD，充值：DEPOSIT_PAGE_LOAD
    message:{
      status: 0 // start: 0, success: 1, faild: 2
      URL: URL
    },
    traceID: traceID
});






HRAnalysis.eventTrack({
  name:'PAY_USER_CONSUMING_DETAIL', // 支付：PAY_USER_CONSUMING_DETAIL，申购：PURCHASE_USER_CONSUMING_DETAIL，融资：DEBIT_USER_CONSUMING_DETAIL，开户：ACCOUNT_USER_CONSUMING_DETAIL，充值：DEPOSIT_USER_CONSUMING_DETAIL
  message:{
    time: 30, //秒数,
    pageURL: 'pageURL'
  }
});

HRAnalysis.eventTrack({
  name:'API_'+接口名,
  message:{
    status: 0 // start: 0, success: 1, faild: 2
    time: 30 //秒数
  },
  traceID: traceID
});

HRAnalysis.eventTrack({
  name:'PAY_ABORT' // 支付：PAY_ABORT，申购：PURCHASE_ABORT，融资：DEBIT_ABORT，开户：ACCOUNT_ABORT，充值：DEPOSIT_ABORT
  message:{
    pageURL: 'pageURL'
  }
});
