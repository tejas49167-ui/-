import { useCallback, useEffect, useState } from 'react'
import { StoreContext } from './storeContext'

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({})
  const [food_list, setFoodList] = useState([])
  const [token, setToken] = useState('')
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

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
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId]
        }
      }
    }

    return totalAmount
  }

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0)
  }

  const loadFoodList = useCallback(async () => {
    const response = await fetch(`${url}/api/food/list`)
    const data = await response.json()

    if (data.success) {
      setFoodList(data.data)
    }
  }, [url])

  useEffect(() => {
    async function loadData() {
      await loadFoodList()

      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
      }
    }

    loadData()
  }, [loadFoodList])

  const contextValue = {
    addToCart,
    cartItems,
    food_list,
    getTotalCartAmount,
    getTotalCartItems,
    removeFromCart,
    setToken,
    token,
    url,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
