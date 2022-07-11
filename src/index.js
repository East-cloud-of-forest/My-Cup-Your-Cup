import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './index.scss'
import './fonts/CanvasUseFont.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './datasources/firebase'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
   </React.StrictMode>,
)

reportWebVitals()
