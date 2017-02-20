import React from 'react';
import { Router, browserHistory } from 'react-router/';
import App from 'containers/App';

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

const routes = {
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent(location, cb) {
        System.import('pages/Dashboard')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: '/Dashboard',
      getComponent(location, cb) {
        System.import('pages/Dashboard')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: '/Channels',
      getComponent(location, cb) {
        System.import('pages/Channel')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: '/Users',
      getComponent(location, cb) {
        System.import('pages/Users')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: '/Business',
      getComponent(location, cb) {
        System.import('pages/Business')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    }
  ]
};

export default () => <Router history={browserHistory} routes={routes} />;
