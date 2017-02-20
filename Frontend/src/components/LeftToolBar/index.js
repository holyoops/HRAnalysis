import React, { Component } from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Menu from 'components/Menu';
import './index.less';

class SubTitle extends Component {


    constructor(props) {
      super(props);
      this.state = {
        transiton: 'sub-title move'
      };
    }

    // componentDidAppear(){
    //   console.log(1111);
    //   this.setState({
    //     transiton: 'sub-title move'
    //   });
    // }

    componentWillAppear(callback) {
        console.log('will appear');
        callback();
    }
    componentDidAppear() {
        console.log('did appear');
    }

    componentWillEnter(callback) {
        callback();
        console.log('will enter');
    }
    componentDidEnter() {
        console.log('did enter');
    }
    componentWillLeave(callback) {
        callback();
        console.log('wiil leave');
    }
    componentDidLeave() {
        console.log('did leave');
    }
    componentWillUnmount() {
        console.log('will unmount');
    }

    render(){
        return(
          <div className={this.state.transiton}>
            <div className='for'>
              for
            </div>
            <div className='open-pletform'>
              开放平台
            </div>
          </div>
        );
    }
}

class LeftToolBar extends Component {

  render() {
    return (
      <div className='left-tool-bar'>
        <div className='logo'>
          <div className='HRAnalysis'>
            HRAnalysis
          </div>
          <SubTitle />
        </div>
        <Menu/>
      </div>
    );
  }

}

export default LeftToolBar;
