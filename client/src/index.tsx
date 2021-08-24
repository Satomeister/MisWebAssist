import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'antd/dist/antd.css';

import App from './App';
import RootStore from './store';

const store = RootStore.create({});

export const StoreContext = createContext(store);

ReactDOM.render(
  <Router>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </Router>,
  document.getElementById('root')
);
