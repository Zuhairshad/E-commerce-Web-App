import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopContextProvider>    {/**  Here we have added shopcontextprovider to get the context api in our all components */}
    <App/> 
  </ShopContextProvider>
  </BrowserRouter>,
)
