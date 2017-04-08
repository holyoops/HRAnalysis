import React, { Component } from 'react';
import {__GLOBAL} from 'common/config.js';
import {ajax} from 'common/ajax.js';
import './index.less';

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

  // componentDidMount(callback) {
  //   sort();
  //   this.setState({items: items});
  // }

  constructor(props) {
      super(props);
      props.ajax = ajax({
          url: __GLOBAL('HOST_URL') + 'getChannelData'
      });

      this.state = {
          data: []
      };
  }

  componentDidMount() {
      this.props.ajax.then(xhr => {
          let xhrJSON = JSON.parse(xhr.response);
          this.setState({
              data: xhrJSON.data
          })
      },
      function (e) {
          console.log(JSON.stringify(e));
          return;
      });
  }

  render () {
  	return (
      <div className="ChannelRank">
      <div className="channel-rank-row">
        <div className="channel-rank-cell channel-rank-row-title channel-rank-number">
          排名
        </div>
        <div className="channel-rank-cell channel-rank-row-title channel-rank-app-ID">
          APP ID
        </div>
        <div className="channel-rank-cell channel-rank-row-title channel-rank-init-count">
          开户数
        </div>
        {/*
        <div className="channel-rank-cell channel-rank-row-title channel-rank-pay-count">
          支付调用次数
        </div>
        <div className="channel-rank-cell channel-rank-row-title channel-rank-debit-count">
          融资调用次数
        </div>
        <div className="channel-rank-cell channel-rank-row-title channel-rank-purchase-count">
          投资调用次数
        </div>
        */}
      </div>
      {this.state.data.map((item) => {
        return (
          <div className="channel-rank-row">
            <div className={createNumberClass({item})}>
              {item.rank}
            </div>
            <div className="channel-rank-cell channel-rank-app-ID">
              {item.appID}
            </div>
            <div className="channel-rank-cell channel-rank-init-count">
              {item.openAccountCount}
            </div>
            {/*
            <div className="channel-rank-cell channel-rank-pay-count">
              {item.payCount}
            </div>
            <div className="channel-rank-cell channel-rank-debit-count">
              {item.debitCount}
            </div>
            <div className="channel-rank-cell channel-rank-purchase-count">
              {item.purchaseCount}
            </div>
            */}
          </div>
        )
      })}
      </div>
    );
  }
}

export default ChannelRank;
