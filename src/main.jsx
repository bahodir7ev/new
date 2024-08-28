import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/main.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'

ReactDOM.createRoot(document.querySelector('.wrapper')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
)
