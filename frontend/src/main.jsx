import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { store, persistor } from "./store/store.js"
import { Provider } from "react-redux"
import { Toaster } from "./components/ui/sonner.jsx"
import { PersistGate } from "redux-persist/integration/react"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    <Toaster position="bottom-right" />
  </StrictMode>
)
