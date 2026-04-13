import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getApiBaseUrl } from './api';

if (typeof window !== 'undefined') {
  console.log('[index] browser origin:', window.location.origin);
  console.log('[index] browser host:', window.location.host);
}

const apiBaseUrl = getApiBaseUrl();
console.log('[index] React app backend base URL:', apiBaseUrl);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
