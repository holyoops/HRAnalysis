import React, { Component } from 'react';
import LastSDKInit from 'components/LastSDKInit';
import ProgressRing from 'components/ProgressRing';
import './index.less';

class DashboardBottom extends Component {
  render () {
  	return (
      <div className='DashboardBottom'>
        {/*<div className="left">
        </div>*/}
        <div className="center">
          <LastSDKInit />
        </div>
        {/*<div className="right">
          <ProgressRing />
        </div>*/}
      </div>
    );
  }
}

export default DashboardBottom;
