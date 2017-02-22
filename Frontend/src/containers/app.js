import React, { PropTypes } from 'react';
import LeftToolBar from 'components/LeftToolBar';
import './app.less';

const App = (props) => (
  <main className="viewport">
    <div className="viewport-top">
    </div>
    <div className="viewport-bottom">
      <div className="viewport-left">
        <LeftToolBar />
      </div>
      <div className="viewport-right">
        {props.children}
      </div>
    </div>
  </main>
);

App.propTypes = {
  children: PropTypes.node
};

export default App;
