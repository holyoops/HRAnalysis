import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Menu from 'components/Menu';
import './index.less';

class LeftToolBar extends Component {

  componentWillAppear(callback) {
      console.log('will appear');
  }
  componentDidAppear() {
      console.log('did appear');
  }

  componentWillEnter(callback) {
      console.log('will enter');
  }
  componentDidEnter() {
      console.log('did enter');
  }
  componentWillLeave(callback) {
      console.log('wiil leave');
  }
  componentDidLeave() {
      console.log('did leave');
  }
  componentWillUnmount() {
      console.log('will unmount');
  }

  render() {
    return (
      <div className='left-tool-bar'>
      {/*
        <div className='logo'>
          <div className='HRAnalysis'>
            HRAnalysis
          </div>
          <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
            <div className='sub-title' key='sub-title'>
              <div className='for'>
                for
              </div>
              <div className='open-pletform'>
                开放平台
              </div>
            </div>
          </ReactCSSTransitionGroup>
        </div>
      */}
        <div className="menu-container">
          <Menu/>
        </div>
      </div>
    );
  }

}

export default LeftToolBar;
