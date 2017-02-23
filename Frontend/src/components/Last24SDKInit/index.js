import React, { Component } from 'react';
import './index.less';

const divStyle = {
  height: '67%'
};

const allCount = 981;

const items = [{
    count: '2k',
    hour: '0~2'
  },{
    count: '2k',
    hour: '2~4'
  },{
    count: '2k',
    hour: '4~6'
  },{
    count: '2k',
    hour: '6~8'
  },{
    count: '2k',
    hour: '8~10'
  },{
    count: '2k',
    hour: '10~12'
  },{
    count: '2k',
    hour: '12~14'
  },{
    count: '2k',
    hour: '14~16'
  },{
    count: '2k',
    hour: '16~18'
  },{
    count: '2k',
    hour: '18~20'
  },{
    count: '2k',
    hour: '22~24'
  }];

class Last24SDKInit extends Component {

  render () {
  	return (
      <div className='Last24SDKInit'>
        <div className='Last24SDKInit-top'>
          <div className='Last24SDKInit-left'>
            <div className='Last24SDKInit-left-container'>
              <div className='Last24SDKInit-last24CountDelta'>
                <span className='Last24SDKInit-last24CountDelta-icon Last24SDKInit-last24CountDelta-icon-plus'>↑{/*↓*/}</span>
                <span className='Last24SDKInit-last24CountDelta-number'>12</span>
                <span className='Last24SDKInit-last24CountDelta-unit'>k</span>
              </div>
              <div className='Last24SDKInit-last24CountDelta-text'>
                最近24小时SDK初始化变化量
              </div>
            </div>
          </div>
          <div className='Last24SDKInit-right'>
            <div className='Last24SDKInit-right-container'>
              <div className='Last24SDKInit-last24Count'>
                <span className='Last24SDKInit-last24Count-number'>981</span>
                <span className='Last24SDKInit-last24Count-unit'>k</span>
              </div>
              <div className='Last24SDKInit-last24Count-text'>
                最近24小时SDK初始化次数
              </div>
            </div>
          </div>
        </div>
        <div className='Last24SDKInit-bottom'>
          <div className='Last24SDKInit-hour-container'>
          {items.map((item) => {
            return (
              <div className='Last24SDKInit-hour'>
                <div className='Last24SDKInit-hour-count'>
                  {item.count}
                </div>
                <div className='Last24SDKInit-hour-bg'>
                  <div className='Last24SDKInit-hour-bar' style={divStyle}>
                  </div>
                </div>
                <div className='Last24SDKInit-hour-text'>
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

export default Last24SDKInit;
