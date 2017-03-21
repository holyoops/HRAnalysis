import React from 'react';
import SDKFuncCalledChart from 'components/SDKFuncCalledChart';
import './index.less';
export default () => (
  <div className="pages-business">
    <div className="business-top">
      <div className="business-top-left">
        <SDKFuncCalledChart />
      </div>
      <div className="business-top-right">
        <SDKFuncCalledChart />
      </div>
    </div>
    <div className="business-bottom">
      <div className="business-right-left">
        <SDKFuncCalledChart />
      </div>
      <div className="business-right-right">
        <SDKFuncCalledChart />
      </div>
    </div>
  </div>
);
