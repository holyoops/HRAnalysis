// --------- HRAnalysis SDK 定义

{
  initID: uuid, // 本次初始化埋点SDK的ID
  name:'name',
  appID: appID,
  openID: openID, // 开放平台openID
  traceID: traceID,
  message: message
}

// ----------- 开放平台SDK埋点

// SDK每次初始化时调用，用于统计SDK初始化次数和设备信息
HRAnalysis.eventTrack({
    name:'INIT_DEVICE_INFO',
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

// SDK调用相应功能时调用
HRAnalysis.eventTrack({
    name:'PAY_USER_CONSUMING', // 支付：PAY_USER_CONSUMING，申购：PURCHASE_USER_CONSUMING，融资：DEBIT_USER_CONSUMING，开户：ACCOUNT_USER_CONSUMING，充值：DEPOSIT_USER_CONSUMING
    message:{
      status: 0, // start: 0, success: 1, cancel: 2,
      bindCard: false // 是否包含绑卡，暂只需传入false
    },
    traceID: traceID
});

// SDK载入页面时调用
HRAnalysis.eventTrack({
    name:'PAY_PAGE_LOAD', // 支付：PAY_PAGE_LOAD，申购：PURCHASE_PAGE_LOAD，融资：DEBIT_PAGE_LOAD，开户：ACCOUNT_PAGE_LOAD，充值：DEPOSIT_PAGE_LOAD
    message:{
      status: 0 // start: 0, success: 1, faild: 2
      URL: URL
    },
    traceID: traceID
});


// 前端开户成功后调用，用于渠道开户数
HRAnalysis.eventTrack({
  name:'CREATE_ACCOUNT_SUCCESS',
  message:{
  }
});
