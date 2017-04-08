let getEVN = ()=> {

    const ENV = process.argv.splice(2)[0];
    switch (ENV) {
        case 'DEV':
            console.log('DEV');
            return 'DEV';
            break;
        case 'SIT':
            console.log('SIT');
            return 'SIT';
            break;
        case 'UAT':
            console.log('UAT');
            return 'UAT';
            break;
        case 'PRE_RELEASE':
            console.log('PRE_RELEASE');
            return 'PRE_RELEASE';
            break;
        case 'RELEASE':
            console.log('RELEASE');
            return 'RELEASE';
            break;
        default:
            console.log('环境配置错误，请检查启动参数（DEV/SIT/UAT/PRE_RELEASE/RELEASE）');
            process.exit();
            break;
    }

}

let EVN = getEVN();

const EVN_C = {
  LOCAL: {
      MONGODB_URL: 'mongodb://10.128.166.43/',
      MONGODB_NAME: 'logi_anal',
      KAFKA_IPS: '10.128.166.25:2181,10.128.166.27:2181,10.128.166.28:2181',
      KAFKA_TOPIC: 'logi_anal_front',
      KAFKA_CLIENT_ID: 'clientID',
      KAFKA_KEY: 'theKey',
      BQS_IP: '10.128.166.43',
      BQS_PATH: '/bqsIpCheck/ipCheck?',
      BQS_PORT: '9012',
      BQS_CN: 'qk'
  },
  DEV: {
      MONGODB_URL: 'mongodb://10.128.166.43/',
      MONGODB_NAME: 'logi_anal',
      KAFKA_IPS: '10.128.166.25:2181,10.128.166.27:2181,10.128.166.28:2181',
      KAFKA_TOPIC: 'logi_anal_front',
      KAFKA_CLIENT_ID: 'clientID',
      KAFKA_KEY: 'theKey',
      BQS_IP: '10.128.166.43',
      BQS_PATH: '/bqsIpCheck/ipCheck?',
      BQS_PORT: '9012',
      BQS_CN: 'qk'
  },
  SIT: {
      MONGODB_URL: 'mongodb://10.128.166.43/',
      MONGODB_NAME: 'logi_anal',
      KAFKA_IPS: '10.128.166.25:2181,10.128.166.27:2181,10.128.166.28:2181',
      KAFKA_TOPIC: 'logi_anal_front',
      KAFKA_CLIENT_ID: 'clientID',
      KAFKA_KEY: 'theKey',
      BQS_IP: '10.128.166.43',
      BQS_PATH: '/bqsIpCheck/ipCheck?',
      BQS_PORT: '9012',
      BQS_CN: 'qk'
  },
  UAT: {
      MONGODB_URL: 'mongodb://10.128.166.43/',
      MONGODB_NAME: 'logi_anal',
      KAFKA_IPS: '10.128.166.25:2181,10.128.166.27:2181,10.128.166.28:2181',
      KAFKA_TOPIC: 'logi_anal_front',
      KAFKA_CLIENT_ID: 'clientID',
      KAFKA_KEY: 'theKey',
      BQS_IP: '10.128.166.43',
      BQS_PATH: '/bqsIpCheck/ipCheck?',
      BQS_PORT: '9012',
      BQS_CN: 'qk'
  },
  PRE_RELEASE: {
      MONGODB_URL: ''
  },
  RELEASE: {
      MONGODB_URL: ''
  }
}

const C = {
  MONGODB_URL: EVN_C[EVN].MONGODB_URL,
  MONGODB_NAME: EVN_C[EVN].MONGODB_NAME,
  KAFKA_IPS: EVN_C[EVN].KAFKA_IPS,
  KAFKA_TOPIC: EVN_C[EVN].KAFKA_TOPIC,
  KAFKA_CLIENT_ID: EVN_C[EVN].KAFKA_CLIENT_ID,
  KAFKA_KEY: EVN_C[EVN].KAFKA_KEY,
  BQS_IP: EVN_C[EVN].BQS_IP,
  BQS_PATH: EVN_C[EVN].BQS_PATH,
  BQS_PORT: EVN_C[EVN].BQS_PORT,
  BQS_CN: EVN_C[EVN].BQS_CN
}

module.exports =  function(key){

  return C[key];

}
