import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

const onSave = (method, key, data) => {
    if (method) {
      localStorage.setItem(key, data);
    }
    else {
      return localStorage.getItem(key);
    }
  }

ReactDOM.render(<App onSave = {onSave}/>, document.getElementById('root'));