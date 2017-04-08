import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './index.less';

const items = [
  {
      en: 'Dashboard',
      cn: '总览',
      key: 'dashboard'
  },
  {
      en: 'Channels',
      cn: '渠道',
      key: 'channels'
  },
  {
      en: 'Users',
      cn: '用户分布',
      key: 'users'
  },
  {
      en: 'Business',
      cn: '业务',
      key: 'business'
  }
];

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItemKey : browserHistory.getCurrentLocation().pathname.split('/')[1]
    };
  }

  componentDidMount() {
    let currentItemKey = browserHistory.getCurrentLocation().pathname.split('/')[1];
    if (currentItemKey === ''){
      this.setState({
        selectedItemKey: 'dashboard'
      });
    }else{
      this.setState({
        selectedItem: currentItemKey
      });
    }
  }

  handleClick(itemKey, event) {
    this.setState({selectedItemKey: itemKey});
    browserHistory.push('/' + itemKey);
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
