import React from 'react'
import ReactDOM from 'react-dom/client'
import {Toaster} from "react-hot-toast"
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    { <Toaster className="toast" position="bottom-left"/> }
    <App />
  </React.StrictMode>,
)
