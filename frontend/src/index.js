import React from 'react'
import ReactDOMClient from 'react-dom/client'
import App from './components/App'
import './index.css'

// Always the same
const container  = document.getElementById('root')
const root = ReactDOMClient.createRoot(container);
root.render(<App />)