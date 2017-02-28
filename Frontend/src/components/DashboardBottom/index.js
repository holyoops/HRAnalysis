import React, { Component } from 'react';
import Last24SDKInit from 'components/Last24SDKInit';
import ProgressRing from 'components/ProgressRing';
import './index.less';

class DashboardBottom extends Component {
  render () {
  	return (
      <div className='DashboardBottom'>
        <div className="left">
        </div>
        <div className="center">
          <Last24SDKInit />
        </div>
        <div className="right">
          <ProgressRing />
        </div>
      </div>
    );
  }
}

export default DashboardBottom;
