import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from "./components/Home/Home"
import Cart from "./components/Cart/Cart"
import Products from "./components/Products/Products"
import Categories from "./components/Categories/Categories"
import Brands from "./components/Brands/Brands"
import Wishlist from "./components/Wishlist/Wishlist"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Verify from "./components/Verify/Verify"
import Notfound from "./components/Notfound/Notfound"
import UserContextProvider, { UserContext } from './context/UserContext'
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter"
import ProductDetails from "./components/ProductDetails/ProductDetails"
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import Checkout from "./components/Checkout/Checkout"
import AllOrders from "./components/AllOrders/Allorders"
import WishListContextProvider from "./Context/WishlistContext"
import ResetCode from "./components/ResetCode/ResetCode"
import ResetPassword from "./components/ResetPassword/ResetPassword"






let x =createBrowserRouter([
  {path:"", element:<Layout/>, children:[
    {index:true, element:<ProtectedRouter><Home/></ProtectedRouter>},
    {path:"/cart", element:<ProtectedRouter><Cart/></ProtectedRouter>},
    {path:"/products", element:<ProtectedRouter><Products/></ProtectedRouter>},
    {path:"/productdetails/:id/:category", element:<ProtectedRouter><ProductDetails/></ProtectedRouter>},
    {path:"/categories", element:<ProtectedRouter><Categories/></ProtectedRouter>},
    {path:"/brands", element:<ProtectedRouter><Brands/></ProtectedRouter>},
    {path:"/wishlist", element:<ProtectedRouter><Wishlist/></ProtectedRouter>},
    {path:"/checkout", element:<ProtectedRouter><Checkout/></ProtectedRouter>},
    {path:"/allorders", element:<ProtectedRouter><AllOrders/></ProtectedRouter>},
    {path:"/login", element:<Login/>},
    {path:"/register", element:<Register/>},
    {path:"/verify", element:<Verify/>},
    {path:"/resetcode", element:<ResetCode/>},
    {path:"/resetpassword", element:<ResetPassword/>},
    {path:"*", element:<Notfound/>},
  ]}
])


function App() {
  const [count, setCount] = useState(0)

  return<>
  <UserContextProvider>
  <CartContextProvider>
  <WishListContextProvider>
  <RouterProvider router={x}></RouterProvider> 
  </WishListContextProvider>
  <Toaster/>
  </CartContextProvider>
  </UserContextProvider>
  
  </>
}

export default App
