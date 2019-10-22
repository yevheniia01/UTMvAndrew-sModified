import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/appstyle';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextRootContainer = require('./App').default;
    render(NextRootContainer);
  });
}