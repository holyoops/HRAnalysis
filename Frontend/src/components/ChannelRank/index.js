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

class ChannelRank extends Component {

  componentDidMount(callback) {
    console.log(items);
    sort();
    console.log(items);
    this.setState({items: items});
  }

  render () {
  	return (
      <div className=''>
      {items.map((item) => {
        return (
          <div>
          {item.rank}&nbsp;{item.appID}
          </div>
        )
      })}
      <br/>
      </div>
    );
  }
}

export default ChannelRank;
