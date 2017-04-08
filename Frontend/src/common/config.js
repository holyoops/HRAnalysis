let getEVN = ()=> {

  let host = window.location.href;
  return 'SIT';
  if (host.split('http://localhost').length > 1){
    return 'LOCAL';
  }
  if (host.split('http://localhost').length > 1){
    return 'DEV';
  }
  if (host.split('10.0.0.2').length > 1){
    return 'SIT';
  }
  if (host.split('10.0.0.3').length > 1){
    return 'UAT';
  }
  if (host.split('10.0.0.4').length > 1){
    return 'PRE_RELEASE';
  }
  if (host.split('10.0.0.5').length > 1){
    return 'RELEASE';
  }

}

let EVN = getEVN();

const EVN_C = {
  LOCAL: {
    HOST_URL: 'http://localhost:10260/api/'
  },
  DEV: {
    HOST_URL: '/analysis/'
  },
  SIT: {
    HOST_URL: '/analysis/'
  },
  UAT: {
    HOST_URL: '/analysis/'
  },
  PRE_RELEASE: {
    HOST_URL: '/analysis/'
  },
  RELEASE: {
    HOST_URL: '/analysis/'
  }
}

const C = {
  HOST_URL: EVN_C[EVN].HOST_URL
}

export function __GLOBAL(key){

  return C[key];

}
