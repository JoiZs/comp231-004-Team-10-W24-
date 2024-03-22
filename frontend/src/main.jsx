import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain="https://dev-0r3rp28j4gecjx8d.us.auth0.com"
    clientId="dgIHuOArbZShOdDbB9r6W3PwQC6sHOFd"
    redirectUri="http://localhost:3000/callback"
    >
    <App />
  </Auth0Provider>
  </React.StrictMode>,
)