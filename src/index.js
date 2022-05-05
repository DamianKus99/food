import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("localStorage");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
