module.exports = function (key, env){
  const c = {
    LOCAL: {
      HOST_URL: 'http://localhost:10261/api/'
    },
    DEV: {
      HOST_URL: 'http://10.128.166.39:10260/api/'
    },
    SIT: {
      HOST_URL: ''
    },
    UAT: {
      HOST_URL: ''
    },
    PRE_RELEASE: {
      HOST_URL: ''
    },
    RELEASE: {
      HOST_URL: ''
    }
    COMMON: {

    }
  }

  let r = c['COMMON'][key];

  if (r) {
    return r;
  }else{
    return c[env][key];
  }
}
