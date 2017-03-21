import React from 'react';
import ChannelRank from 'components/ChannelRank';
import './index.less';
export default () => (
  //<UserTrend />
  <div className="pages-channel">
    <div className="channel-rank-title">
      渠道初始化SDK次数（TOP 10）
    </div>
    <ChannelRank />
  </div>
);
