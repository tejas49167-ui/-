import React, { useContext, useState } from 'react'
import axios from 'axios'
import './placeOrder.css'
import { StoreContext } from '../../context/storeContext'

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalCartAmount, token, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })
  const subtotal = getTotalCartAmount()
  const deliveryFee = subtotal === 0 ? 0 : 2
  const total = subtotal + deliveryFee

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault()

    const orderItems = []
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] })
      }
    })

    const response = await axios.post(
      `${url}/api/order/place`,
      { address: data, amount: total, items: orderItems },
      { headers: { token } }
    )
    const result = response.data

    if (result.success) {
      window.location.replace(result.session_url)
    } else {
      alert(result.message)
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' required />
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' required />
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' required />
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>
          <button type="submit" disabled={subtotal === 0}>Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
