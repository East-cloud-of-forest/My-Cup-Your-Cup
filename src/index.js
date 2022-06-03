import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
=======
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root');
>>>>>>> fc1e8e63c68e6e9e3957a9bcd7a6489f291c55da

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
