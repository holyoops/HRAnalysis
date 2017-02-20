import React, { PropTypes } from 'react';
import LeftToolBar from 'components/LeftToolBar';
import './app.less';

const App = (props) => (
  <main className="viewport">
    <div className="left">
      <LeftToolBar />
    </div>
    <div className="right">
      {props.children}
    </div>

  </main>
);

App.propTypes = {
  children: PropTypes.node
};

export default App;
