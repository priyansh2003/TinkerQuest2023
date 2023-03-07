import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const API_KEY = '478fb814a18ca7955130a57160959e96';

ReactDOM.render(
  <React.StrictMode>
    <App apiKey={API_KEY} />
  </React.StrictMode>,
  document.getElementById('root')
);
