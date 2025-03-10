import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE}>
      <App />
    </GoogleOAuthProvider>
    // </React.StrictMode>
)

