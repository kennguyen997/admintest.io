import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.scss';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import { BrowserRouter } from 'react-router-dom';
import NavigateSetter from 'navigateSetter';
import './app/trans/i18n';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <NavigateSetter />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
