import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/Global.css';
import './styles/Components.css';
import './styles/Navigation.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);