import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Cart from './pages/cart/cart'
import PlaceOrder from './pages/placeOrder/placeOrder'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Footer from './components/Footer/Footer'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <> 
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} /> 
        <Route path='/order' element={<PlaceOrder />} />
      </Routes>
    </div>
    <Footer /> 
    </>
  )
}

export default App
