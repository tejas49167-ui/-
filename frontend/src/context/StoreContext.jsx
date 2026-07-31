import { useState } from 'react'
import { food_list } from '../assets/frontend_assets/assets'
import { StoreContext } from './storeContext'

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({})

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }))
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId)
        totalAmount += itemInfo.price * cartItems[itemId]
      }
    }

    return totalAmount
  }

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0)
  }

  const contextValue = {
    addToCart,
    cartItems,
    food_list,
    getTotalCartAmount,
    getTotalCartItems,
    removeFromCart,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
