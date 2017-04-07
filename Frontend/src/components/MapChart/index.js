import React, {Component} from 'react';
import {__GLOBAL} from 'common/config.js';
import {ajax} from 'common/ajax.js';
import './index.less';
import ReactEcharts from 'echarts-for-react';
import './cn.geo.js';

var ReactDOM = require('react-dom');
var cityList = require('./cityList.js');

var geoCoordMap = {
    "北京市":[116.28, 39.54],
  "上海市":[121.29, 31.14],
  "天津市":[117.11, 39.09],
  "重庆市":[106.32, 29.32],
  "黑龙江省":[126.41, 45.45],
  "吉林省":[125.19, 43.52],
  "辽宁省":[123.24, 41.50],
  "内蒙古自治区":[111.48, 40.49],
  "河北省":[114.28, 38.02],
  "山西省":[112.34, 37.52],
  "山东省":[117.00, 36.38],
  "河南省":[113.42, 34.48],
  "陕西省":[108.54, 34.16],
  "甘肃省":[103.49, 36.03],
  "宁夏回族自治区":[106.16, 38.20],
  "青海省":[101.45, 36.38],
  "新疆维吾尔自治区":[87.36, 43.48],
  "安徽省":[117.18, 31.51],
  "江苏省":[118.50, 32.02],
  "浙江省":[120.09, 30.14],
  "湖南省":[113.00, 28.11],
  "江西省":[115.52, 28.41],
  "湖北省":[114.21, 30.37],
  "四川省":[104.05, 30.39],
  "贵州省":[106.42, 26.35],
  "福建省":[119.18, 26.05],
  "台湾省":[121.31, 25.03],
  "广东省":[113.15, 23.08],
  "海南省":[110.20, 20.02],
  "广西壮族自治区":[108.20, 22.48],
  "云南省":[102.41, 25.00],
  "西藏自治区":[90.08, 29.39],
  "香港特别行政区":[114.10, 22.18],
  "澳门特别行政区":[113.35, 22.14]
};

var getOption = function (data, sumValue, maxValue) {
    return {
      backgroundColor: 'linear-gradient(150deg,#272f47,#1F263E)',
      title: {
        text: '开放平台SDK初始化次数 TOP5',
        subtext: '地区分布',
        left: 'center',
        top: '60px;',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip : {
        trigger: 'item',
        formatter: function (params) {
            console.log(params);
            return params.name + ' : ' + params.data.count;
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
          name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: (convertData(data, sumValue, maxValue)),
          symbolSize: function (val) {
            return val[2];
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
}

var convertData = function (data, sumValue, maxValue) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].province];
    let v = data[i].value;
    if (maxValue > 50) {
        v = (v / sumValue) * 100;
    }

    if (geoCoord) {
      res.push({
        name: data[i].province,
        value: geoCoord.concat(v),
        count: data[i].value
      });
    }
  }
  return res;
};

class MapChart extends React.Component {

    constructor(props) {
        super(props);
        props.ajax = ajax({
            url: __GLOBAL('HOST_URL') + 'getUsersLocation'
        });

        this.state = {
            option: getOption([], 0, 0)
        };
    }

    componentDidMount() {
        this.props.ajax.then(xhr => {
            let xhrJSON = JSON.parse(xhr.response);
            this.setState({
                option: getOption(xhrJSON.data, xhrJSON.sumValue, xhrJSON.maxValue)
            })
        },
        function (e) {
            console.log(JSON.stringify(e));
            return;
        });
    }
  render() {
    return(
      <div className = "MapChart">
      <ReactEcharts option={this.state.option} style={{height: '100%', width: '100%'}} />
      </div>
    );
  }
}

export default MapChart;
// ReactDOM.render(React.createElement(ReactHighmaps, { config: config }), document.getElementById('test'));
//
// require("file?name=[name].[ext]!./highmaps.html");
