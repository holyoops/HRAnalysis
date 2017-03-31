import React, { Component } from 'react';
import './index.less';

const divStyle = {
  height: '67%'
};

const allCount = 981;

const items = [{
    count: '320',
    hour: '0:00~2:00',
    style: {
      height: '32%'
    }
  },{
    count: '2',
    hour: '2:00~4:00',
    style: {
      height: '1%'
    }
  },{
    count: '0',
    hour: '4:00~6:00',
    style: {
      height: '0%'
    }
  },{
    count: '650',
    hour: '6:00~8:00',
    style: {
      height: '65%'
    }
  },{
    count: '870',
    hour: '8:00~10:00',
    style: {
      height: '87%'
    }
  },{
    count: '890',
    hour: '10:00~12:00',
    style: {
      height: '89%'
    }
  },{
    count: '760',
    hour: '12:00~14:00',
    style: {
      height: '76%'
    }
  },{
    count: '660',
    hour: '14:00~16:00',
    style: {
      height: '66%'
    }
  },{
    count: '870',
    hour: '16:00~18:00',
    style: {
      height: '87%'
    }
  },{
    count: '1000',
    hour: '18:00~20:00',
    style: {
      height: '100%'
    }
  },{
    count: '320',
    hour: '22:00~24:00',
    style: {
      height: '32%'
    }
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
                  <div className='Last24SDKInit-hour-bar'>
                    <div className='Last24SDKInit-hour-bar-green' style={item.style}>
                    </div>
                  </div>
                  <div className='Last24SDKInit-hour-bar'>
                    <div className='Last24SDKInit-hour-bar-blue' style={item.style}>
                    </div>
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
