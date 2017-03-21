import React from 'react';
import SDKFuncCalledChart from 'components/SDKFuncCalledChart';
import DashboardBottom from 'components/DashboardBottom';
import {ajax} from '../../ajax.js';
import './index.less';

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
  url: 'https://hop.shrb.it/analysis/eventTrack',
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



// ajax({
//   url: 'http://10.129.34.226:10261/api/eventTrack',
//   method: 'POST',
//   async: true,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   },
//   data: JSON.stringify(data),
//   onprogress: function (evt) {
//     // console.log(evt.position/evt.total);
//   }
// })
// .then(function (xhr) { console.log(xhr.response); },
// function (e) { console.log(JSON.stringify(e)) });

// fetch("http://localhost:3301/api/todo_list", {
//   method: "POST",
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: {test: 1, b: 2}
// }).then(response => response.json())
// .then(data => console.log(data))
// .catch(e => console.log("Oops, error", e));
//
// try {
//   let response = await fetch("http://localhost:3301/api/todo_list", {
//     method: "POST",
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({a: 1, b: 2})
//     // headers: {
//     //   'Content-Type': 'application/json'
//     // }
//     // headers: {
//     //   "Content-Type": "application/x-www-form-urlencoded"
//     // },
//     // body: "firstName=Nikhil&favColor=blue&password=easytoguess"
//   });
//   let data = await response.json();
//   console.log(data);
// } catch(e) {
//   console.log("Oops, error", e);
// }

export default () => (
  <div className="pages-dashboard">
    <SDKFuncCalledChart className="dashboard-top"/>
    <DashboardBottom className="dashboard-bottom"/>
  </div>
);
