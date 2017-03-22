import React from 'react';
import BusinessChart from 'components/BusinessChart';
import './index.less';
export default () => (
  <div className="pages-business">
    <div className="business-top">
      <div className="business-top-left">
        <BusinessChart title="最近14天开户数"/>
      </div>
      <div className="business-top-right">
        <BusinessChart title="最近14天支付调用次数"/>
      </div>
    </div>
    <div className="business-bottom">
      <div className="business-right-left">
        <BusinessChart title="最近14天融资调用次数"/>
      </div>
      <div className="business-right-right">
        <BusinessChart title="最近14天投资调用次数"/>
      </div>
    </div>
  </div>
);
