import React, { Component } from 'react';
import {__GLOBAL} from 'common/config.js';
import {ajax} from 'common/ajax.js';
import './index.less';

class LastSDKInit extends Component {
    constructor(props) {
        super(props);
        props.ajax = ajax({
            url: __GLOBAL('HOST_URL') + 'getLast12HoursData'
        });

        this.state = {
            data: [],
            sumOthersCount: 0,
            sumInitCount: 0
        };
    }

    componentDidMount() {
        this.props.ajax.then(xhr => {
            let xhrJSON = JSON.parse(xhr.response);
            this.setState({
                data: xhrJSON.data,
                sumOthersCount: xhrJSON.sumOthersCount,
                sumInitCount: xhrJSON.sumInitCount
            })
        },
        function (e) {
            console.log(JSON.stringify(e));
            return;
        });
    }

  render () {
  	return (
      <div className='LastSDKInit'>
        <div className='LastSDKInit-top'>
          <div className='LastSDKInit-left'>
            <div className='LastSDKInit-left-container'>
              <div className='LastSDKInit-lastCountDelta'>
                {/*<span className='LastSDKInit-lastCountDelta-icon LastSDKInit-lastCountDelta-icon-plus'>↑↓</span>*/}
                <span className='LastSDKInit-lastCountDelta-number'>{this.state.sumOthersCount}</span>
                <span className='LastSDKInit-lastCountDelta-unit'></span>
              </div>
              <div className='LastSDKInit-lastCountDelta-text'>
                最近12小时功能调用总次数
              </div>
            </div>
          </div>
          <div className='LastSDKInit-right'>
            <div className='LastSDKInit-right-container'>
              <div className='LastSDKInit-lastCount'>
                <span className='LastSDKInit-lastCount-number'>{this.state.sumInitCount}</span>
                <span className='LastSDKInit-lastCount-unit'></span>
              </div>
              <div className='LastSDKInit-lastCount-text'>
                最近12小时SDK初始化次数
              </div>
            </div>
          </div>
        </div>
        <div className='LastSDKInit-bottom'>
          <div className='LastSDKInit-hour-container'>
          {this.state.data.map((item) => {
            return (
              <div className='LastSDKInit-hour'>
                <div className='LastSDKInit-hour-count'>
                  {item.othersCount} | {item.SDKInitCount}
                </div>
                <div className='LastSDKInit-hour-bg'>
                  <div className='LastSDKInit-hour-bar'>
                    <div className='LastSDKInit-hour-bar-green' style={item.othersStyle}>
                    </div>
                  </div>
                  <div className='LastSDKInit-hour-bar'>
                    <div className='LastSDKInit-hour-bar-blue' style={item.SDKInitStyle}>
                    </div>
                  </div>
                </div>
                <div className='LastSDKInit-hour-text'>
                {item.hour}
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default LastSDKInit;
