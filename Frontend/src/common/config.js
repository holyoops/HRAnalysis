let getEVN = ()=> {

  let host = window.location.href;

  if (host.split('localhost').length > 1){
    return 'DEV';
  }
  if (host.split('10.0.0.1').length > 1){
    return 'SIT';
  }
  if (host.split('10.0.0.2').length > 1){
    return 'UAT';
  }
  if (host.split('10.0.0.3').length > 1){
    return 'PRE_RELEASE';
  }
  if (host.split('10.0.0.4').length > 1){
    return 'RELEASE';
  }

}

let EVN = getEVN();

const EVN_C = {
  DEV: {
    HOST_URL: 'https://hop.shrb.it/analysis/'
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
}

const C = {
  HOST_URL: EVN_C[EVN].HOST_URL
}

export function __GLOBAL(key){

  return C[key];

}
