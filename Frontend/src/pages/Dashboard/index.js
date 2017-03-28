import React from 'react';
import SDKFuncCalledChart from 'components/SDKFuncCalledChart';
import DashboardBottom from 'components/DashboardBottom';
import './index.less';

import {postEvent} from 'common/api.js';

postEvent();

import {getAllCount} from 'common/api.js';

getAllCount();

export default () => (
  <div className="pages-dashboard">
    <SDKFuncCalledChart className="dashboard-top"/>
    <DashboardBottom className="dashboard-bottom"/>
  </div>
);
