import React, { Component } from 'react';
import {__GLOBAL} from 'common/config.js';
import {ajax} from 'common/ajax.js';
import './index.less';

const divStyle = {
  height: '67%'
};

const allCount = 981;

const items = [{
    othersCount: '320',
    SDKInitCount: '180',
    hour: '0:00~2:00',
    style: {
      height: '32%'
    }
  },{
    othersCount: '2',
    SDKInitCount: '180',
    hour: '2:00~4:00',
    style: {
      height: '1%'
    }
  },{
    othersCount: '0',
    SDKInitCount: '180',
    hour: '4:00~6:00',
    style: {
      height: '0%'
    }
  },{
    othersCount: '650',
    SDKInitCount: '180',
    hour: '6:00~8:00',
    style: {
      height: '65%'
    }
  },{
    othersCount: '870',
    SDKInitCount: '180',
    hour: '8:00~10:00',
    style: {
      height: '87%'
    }
  },{
    othersCount: '890',
    SDKInitCount: '180',
    hour: '10:00~12:00',
    style: {
      height: '89%'
    }
  },{
    othersCount: '760',
    SDKInitCount: '180',
    hour: '12:00~14:00',
    style: {
      height: '76%'
    }
  },{
    othersCount: '660',
    SDKInitCount: '180',
    hour: '14:00~16:00',
    style: {
      height: '66%'
    }
  },{
    othersCount: '870',
    SDKInitCount: '180',
    hour: '16:00~18:00',
    style: {
      height: '87%'
    }
  },{
    othersCount: '1000',
    SDKInitCount: '180',
    hour: '18:00~20:00',
    style: {
      height: '100%'
    }
  },{
    othersCount: '320',
    SDKInitCount: '180',
    hour: '22:00~24:00',
    style: {
      height: '32%'
    }
  }];

class Last24SDKInit extends Component {
    constructor(props) {
        super(props);
        props.ajax = ajax({
            url: __GLOBAL('HOST_URL') + 'getLast24HoursData'
        });

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.props.ajax.then(xhr => {
            console.log(JSON.parse(xhr.response).data);
            this.setState({
                data: JSON.parse(xhr.response).data
            })
        },
        function (e) {
            console.log(JSON.stringify(e));
            return;
        });
    }

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
          {this.state.data.map((item) => {
            return (
              <div className='Last24SDKInit-hour'>
                <div className='Last24SDKInit-hour-count'>
                  {item.SDKInitCount}/{item.othersCount}
                </div>
                <div className='Last24SDKInit-hour-bg'>
                  <div className='Last24SDKInit-hour-bar'>
                    <div className='Last24SDKInit-hour-bar-green' style='height:'+{item.style.othersHeight}>
                        {item.style.othersHeight}
                    </div>
                  </div>
                  <div className='Last24SDKInit-hour-bar'>
                    <div className='Last24SDKInit-hour-bar-blue' style={item.style.SDKInitHeight}>
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
