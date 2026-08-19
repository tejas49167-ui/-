import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { food_list as sampleFoodList } from '../assets/frontend_assets/assets'
import { StoreContext } from './storeContext'

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({})
  const [food_list, setFoodList] = useState([])
  const [token, setToken] = useState('')
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))

    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } })
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }))

    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } })
    }
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
    try {
      const response = await axios.get(`${url}/api/food/list`)

      if (response.data.success && response.data.data.length > 0) {
        setFoodList(response.data.data)
      } else {
        setFoodList(sampleFoodList)
      }
    } catch (error) {
      setFoodList(sampleFoodList)
    }
  }, [url])

  const loadCartData = useCallback(async (authToken) => {
    const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token: authToken } })

    if (response.data.success) {
      setCartItems(response.data.cartData)
    }
  }, [url])

  useEffect(() => {
    async function loadData() {
      await loadFoodList()

      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
        await loadCartData(localStorage.getItem('token'))
      }
    }

    loadData()
  }, [loadCartData, loadFoodList])

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
