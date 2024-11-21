import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./store/store.js"
import { Provider } from 'react-redux'
import {Toaster} from "./components/ui/sonner.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}> <App /></Provider>
      <Toaster position="bottom-right" />
  </StrictMode>,
)