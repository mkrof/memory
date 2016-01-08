import {} from '../sass/app.scss';
import { render } from 'react-dom';
import React from 'react';
import App from './App';
import store from './store';

render(
  <App store={store}/>,
  document.getElementById('app-container')
);
