import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { ScrollToTop } from './components';
import App from './App';
import './index.scss';
import 'emoji-mart/css/emoji-mart.css';

render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
