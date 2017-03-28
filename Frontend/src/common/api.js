import {__GLOBAL} from 'common/config.js';
import {ajax} from 'common/ajax.js';

export function getAllCount() {
  ajax({
    url: __GLOBAL('HOST_URL') + 'getAll',
    method: 'GET',
    async: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    onprogress: function (evt) {
      // console.log(evt.position/evt.total);
    }
  })
  .then(function (xhr) { console.log(xhr.response); },
  function (e) { console.log(JSON.stringify(e)) });
}

export function postEvent() {
  const data = {
    initID: 'uuid', // 本次初始化埋点SDK的ID
    eventID: 'uuid',
    timestamp: 'yyyymmddhhmmss',
    name:'name',
    appID: 'appID',
    openID: 'openID', // 开放平台openID
    traceID: 'traceID',
    message: {
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
      },
      deviceType: 'iOS', // iOS/Android/JS(iOS)/JS(Android)/JS(PC)
      OSVersion: '10',
      userAgent: ''
    }
  };


  ajax({
    url: __GLOBAL('HOST_URL') + 'eventTrack',
    method: 'POST',
    async: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: JSON.stringify(data),
    onprogress: function (evt) {
      // console.log(evt.position/evt.total);
    }
  })
  .then(function (xhr) { console.log(xhr.response); },
  function (e) { console.log(JSON.stringify(e)) });
}
