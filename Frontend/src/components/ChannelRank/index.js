import React, { Component } from 'react';
import './index.less';

const items = [
  {
    rank: '8',
    appID: 'bc3a54eb-92ab-4cce-ba90-4dbf1183b3fd',
    initCount: '239',
    payCount: '189',
    debitCount: '91',
    purchaseCount: '0'
  },
  {
    rank: '7',
    appID: 'bc3a54eb-92ab-4cce-ba90-4dbf1183b3fd',
    initCount: '239',
    payCount: '189',
    debitCount: '91',
    purchaseCount: '0'
  },
  {
    rank: '2',
    appID: 'bc3a54eb-92ab-4cce-ba90-4dbf1183b3fd',
    initCount: '239',
    payCount: '189',
    debitCount: '91',
    purchaseCount: '0'
  },
  {
    rank: '6',
    appID: 'bc3a54eb-92ab-4cce-ba90-4dbf1183b3fd',
    initCount: '239',
    payCount: '189',
    debitCount: '91',
    purchaseCount: '0'
  },
  {
    rank: '9',
    appID: 'bc3a54eb-92ab-4cce-ba90-4dbf1183b3fd',
    initCount: '239',
    payCount: '189',
    debitCount: '91',
    purchaseCount: '0'
  },
  {
    rank: '3',
    appID: 'bc3a54eb-92ab-4cce-ba90-4dbf1183b3fd',
    initCount: '239',
    payCount: '189',
    debitCount: '91',
    purchaseCount: '0'
  },
  {
    rank: '10',
    appID: 'bc3a54eb-92ab-4cce-ba90-4dbf1183b3fd',
    initCount: '239',
    payCount: '189',
    debitCount: '91',
    purchaseCount: '0'
  },
  {
    rank: '4',
    appID: 'bc3a54eb-92ab-4cce-ba90-4dbf1183b3fd',
    initCount: '239',
    payCount: '189',
    debitCount: '91',
    purchaseCount: '0'
  },
  {
    rank: '5',
    appID: 'bc3a54eb-92ab-4cce-ba90-4dbf1183b3fd',
    initCount: '239',
    payCount: '189',
    debitCount: '91',
    purchaseCount: '0'
  },
  {
    rank: '1',
    appID: 'bc3a54eb-92ab-4cce-ba90-4dbf1183b3fd',
    initCount: '239',
    payCount: '189',
    debitCount: '91',
    purchaseCount: '0'
  }
];

let sort = ()=> {
  items.sort(function(a,b){
    return a.rank-b.rank
  });
}

let createNumberClass = (item)=>{

  let className = '';
  if (item.item.rank === '1'){
    className = ' channel-rank-number-first'
  }else if (item.item.rank === '2'){
    className = ' channel-rank-number-second'
  }else if (item.item.rank === '3'){
    className = ' channel-rank-number-third'
  }

  return 'channel-rank-cell channel-rank-number' + className;
}

class ChannelRank extends Component {

  componentDidMount(callback) {
    sort();
    this.setState({items: items});
  }

  render () {
  	return (
      <div className="ChannelRank">
      <div className="channel-rank-row">
        <div className="channel-rank-cell channel-rank-number channel-rank-row-title">
          排名
        </div>
        <div className="channel-rank-cell channel-rank-app-ID channel-rank-row-title">
          APP ID
        </div>
        <div className="channel-rank-cell channel-rank-init-count channel-rank-row-title">
          初始化次数
        </div>
        <div className="channel-rank-cell channel-rank-pay-count channel-rank-row-title">
          支付调用次数
        </div>
        <div className="channel-rank-cell channel-rank-debit-count channel-rank-row-title">
          融资调用次数
        </div>
        <div className="channel-rank-cell channel-rank-purchase-count channel-rank-row-title">
          投资调用次数
        </div>
      </div>
      {items.map((item) => {
        return (
          <div className="channel-rank-row">
            <div className={createNumberClass({item})}>
              {item.rank}
            </div>
            <div className="channel-rank-cell channel-rank-app-ID">
              {item.appID}
            </div>
            <div className="channel-rank-cell channel-rank-init-count">
              {item.initCount}
            </div>
            <div className="channel-rank-cell channel-rank-pay-count">
              {item.payCount}
            </div>
            <div className="channel-rank-cell channel-rank-debit-count">
              {item.debitCount}
            </div>
            <div className="channel-rank-cell channel-rank-purchase-count">
              {item.purchaseCount}
            </div>
          </div>
        )
      })}
      </div>
    );
  }
}

export default ChannelRank;
