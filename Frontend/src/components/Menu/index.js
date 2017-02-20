import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './index.less';

const items = [
  'Dashboard',
  'Channels',
  'Users',
  'Business'
];

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem : browserHistory.getCurrentLocation().pathname.split('/')[1]
    };
  }

  componentDidMount() {
    let currentItem = browserHistory.getCurrentLocation().pathname.split('/')[1];
    if (currentItem === ''){
      this.setState({
        selectedItem: 'Dashboard'
      });
    }else{
      this.setState({
        selectedItem: currentItem
      });
    }
  }

  handleClick(item, event) {
    this.setState({selectedItem: item});
    browserHistory.push('/' + item);
  }

  render() {
    return (
      <div className='menu'>
      {items.map((item) => {
        return (
          <div className={this.state.selectedItem === item ? 'item selected' : 'item'}
          onClick={this.handleClick.bind(this, item)}>
          {item}
          </div>
        )
      })
    }
    </div>
  );
}

}

export default Menu;
