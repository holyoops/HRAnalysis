import React, { Component, PropTypes } from 'react';
import BusinessChart from 'components/BusinessChart';
import './index.less';
import {__GLOBAL} from 'common/config.js';
import {ajax} from 'common/ajax.js';

class BusinessPage extends Component {

    constructor(props) {

        super(props);
        props.ajax = ajax({
            url: __GLOBAL('HOST_URL') + 'getLastTwoWeeksData?type=business',
            data: {
                type: 'business'
            }
        });

        this.state = {
            data: []
        };
    }
    componentDidMount() {

        this.props.ajax.then(xhr => {
            this.setState({
                data: JSON.parse(xhr.response).data
            })
        },
        function (e) {
            console.log(JSON.stringify(e));
            return
        });
    }

    render () {
        return (
            <div className="pages-business">
              <div className="business-top">
                <div className="business-top-left">
                  <BusinessChart title="最近14天开户数" data={this.state.data} dataKey="openAccountCount"/>
                </div>
                <div className="business-top-right">
                  <BusinessChart title="最近14天支付调用次数" data={this.state.data} dataKey="payCount"/>
                </div>
              </div>
              <div className="business-bottom">
                <div className="business-right-left">
                  <BusinessChart title="最近14天融资调用次数" data={this.state.data} dataKey="debitCount"/>
                </div>
                <div className="business-right-right">
                  <BusinessChart title="最近14天投资调用次数" data={this.state.data} dataKey="purchaseCount"/>
                </div>
              </div>
            </div>
        );
    }
}
export default BusinessPage;
// export default () => (
//   <div className="pages-business">
//     <div className="business-top">
//       <div className="business-top-left">
//         <BusinessChart title="最近14天开户数" dataKey=""/>
//       </div>
//       <div className="business-top-right">
//         <BusinessChart title="最近14天支付调用次数" dataKey=""/>
//       </div>
//     </div>
//     <div className="business-bottom">
//       <div className="business-right-left">
//         <BusinessChart title="最近14天融资调用次数" dataKey=""/>
//       </div>
//       <div className="business-right-right">
//         <BusinessChart title="最近14天投资调用次数" dataKey=""/>
//       </div>
//     </div>
//   </div>
// );
