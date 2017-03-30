import React from 'react';
import SDKFuncCalledChart from 'components/SDKFuncCalledChart';
import DashboardBottom from 'components/DashboardBottom';
import './index.less';

import {postEvent, getAllCount, getUsersLocation} from 'common/api.js';

postEvent();
getAllCount();
getUsersLocation();

export default () => (
  <div className="pages-dashboard">
    <SDKFuncCalledChart className="dashboard-top"/>
    <DashboardBottom className="dashboard-bottom"/>
  </div>
);
