import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './MyOrders.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/storeContext'

const MyOrders = () => {
  const { token, url } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders = useCallback(async () => {
    const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } })
    const result = response.data

    if (result.success) {
      setData(result.data)
    }
  }, [token, url])

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [fetchOrders, token])

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order) => (
          <div key={order._id} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>{order.items.map((item, index) => (
              index === order.items.length - 1
                ? `${item.name} x ${item.quantity}`
                : `${item.name} x ${item.quantity}, `
            ))}</p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button type="button" onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
