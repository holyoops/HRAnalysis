import React, { Component } from 'react';
import { hashHistory, browserHistory } from 'react-router';
import './index.less';

const items = [
  {
      en: 'Dashboard',
      cn: '总览',
      key: 'Dashboard'
  },
  {
      en: 'Channels',
      cn: '渠道',
      key: 'Channels'
  },
  {
      en: 'Users',
      cn: '用户分布',
      key: 'Users'
  },
  {
      en: 'Business',
      cn: '业务',
      key: 'Business'
  }
];

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItemKey : hashHistory.getCurrentLocation().pathname.split('/')[1]
    };
  }



  componentDidMount() {
    let currentItemKey = hashHistory.getCurrentLocation().pathname.split('/')[1];
    if (currentItemKey === ''){
      this.setState({
        selectedItemKey: 'Dashboard'
      });
    }else{
      this.setState({
        selectedItem: currentItemKey
      });
    }
  }

  handleClick(itemKey, event) {
    this.setState({selectedItemKey: itemKey});
    hashHistory.push('/' + itemKey);
  }

  render() {
    return (
      <div className='menu'>
      {items.map((item) => {
        return (
          <div className={this.state.selectedItemKey === item.key ? 'item selected' : 'item'}
          onClick={this.handleClick.bind(this, item.key)}>
            <div className='menu-item-name-en'>
                {item.en}
            </div>
            <div className='menu-item-name-cn'>
                {item.cn}
            </div>
          </div>
        )
      })}
    </div>
  );
}

}

export default Menu;
