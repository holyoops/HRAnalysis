import React, {Component} from 'react';
import './index.less';
import ReactEcharts from 'echarts-for-react';
import './cn.geo.js';

var ReactDOM = require('react-dom');
var cityList = require('./cityList.js');

var data = [
  {name:"北京",value:1},
  {name:"上海",value:50},
  {name:"天津",value:3},
  {name:"重庆",value:4},
  {name:"黑龙江",value:2},
  {name:"吉林",value:1},
  {name:"辽宁",value:1},
  {name:"内蒙古",value:0},
  {name:"河北",value:0},
  {name:"山西",value:0},
  {name:"山东",value:0},
  {name:"河南",value:0},
  {name:"陕西",value:0},
  {name:"甘肃",value:0},
  {name:"宁夏",value:0},
  {name:"青海",value:0},
  {name:"新疆",value:0},
  {name:"安徽",value:0},
  {name:"江苏",value:0},
  {name:"浙江",value:0},
  {name:"湖南",value:0},
  {name:"江西",value:0},
  {name:"河北",value:0},
  {name:"四川",value:0},
  {name:"贵州",value:0},
  {name:"福建",value:0},
  {name:"台湾",value:0},
  {name:"广东",value:0},
  {name:"海南",value:0},
  {name:"广西",value:0},
  {name:"云南",value:0},
  {name:"西藏",value:0},
  {name:"香港",value:0},
  {name:"澳门",value:0}
];
var geoCoordMap = {
  "北京":[116.28, 39.54],
  "上海":[121.29, 31.14],
  "天津":[117.11, 39.09],
  "重庆":[106.32, 29.32],
  "黑龙江":[126.41, 45.45],
  "吉林":[125.19, 43.52],
  "辽宁":[123.24, 41.50],
  "内蒙古":[111.48, 40.49],
  "河北":[114.28, 38.02],
  "山西":[112.34, 37.52],
  "山东":[117.00, 36.38],
  "河南":[113.42, 34.48],
  "陕西":[108.54, 34.16],
  "甘肃":[103.49, 36.03],
  "宁夏":[106.16, 38.20],
  "青海":[101.45, 36.38],
  "新疆":[87.36, 43.48],
  "安徽":[117.18, 31.51],
  "江苏":[118.50, 32.02],
  "浙江":[120.09, 30.14],
  "湖南":[113.00, 28.11],
  "江西":[115.52, 28.41],
  "河北":[114.21, 30.37],
  "四川":[104.05, 30.39],
  "贵州":[106.42, 26.35],
  "福建":[119.18, 26.05],
  "台湾":[121.31, 25.03],
  "广东":[113.15, 23.08],
  "海南":[110.20, 20.02],
  "广西":[108.20, 22.48],
  "云南":[102.41, 25.00],
  "西藏":[90.08, 29.39],
  "香港":[114.10, 22.18],
  "澳门":[113.35, 22.14]
};



var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};

let option = {
  backgroundColor: '#404a59',
  title: {
    text: '开放平台SDK初始化次数',
    subtext: '地区分布',
    left: 'center',
    top: '60px;',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip : {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    y: 'bottom',
    x:'right',
    data:['SDK初始化次数'],
    textStyle: {
      color: '#fff'
    }
  },
  geo: {
    map: 'china',
    label: {
      emphasis: {
        show: false
      }
    },
    roam: true,
    itemStyle: {
      normal: {
        areaColor: '#323c48',
        borderColor: '#111'
      },
      emphasis: {
        areaColor: '#2a333d'
      }
    }
  },
  series : [
    {
      name: 'SDK初始化次数',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: convertData(data),
      symbolSize: function (val) {
        let v = 0;
        if (val[2] >= 10 && val[2] <= 100){
          v = val[2];
        }else if ( val[2] < 10){
          v = 10;
        }else if (val[2] > 100){
          v = 100;
        }
        return v;
      },
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#ddb926'
        }
      }
    },
    {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: convertData(data.sort(function (a, b) {
        return b.value - a.value;
      }).slice(0, 5)),
      symbolSize: function (val) {
        let v = 0;
        if (val[2] >= 10 && val[2] <= 100){
          v = val[2];
        }else if ( val[2] < 10){
          v = 10;
        }else if (val[2] > 100){
          v = 100;
        }
        return v;
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'fill'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    }
  ]
};

class MapChart extends React.Component {

  render() {
    return(
      <div className = "MapChart">
      <ReactEcharts option={option} style={{height: '100%', width: '100%'}} />
      </div>
    );
  }
}

export default MapChart;
// ReactDOM.render(React.createElement(ReactHighmaps, { config: config }), document.getElementById('test'));
//
// require("file?name=[name].[ext]!./highmaps.html");
