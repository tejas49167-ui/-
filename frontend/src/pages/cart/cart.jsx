import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './cart.css'
import { StoreContext } from '../../context/storeContext'

const Cart = () => {
  const { cartItems, food_list, getTotalCartAmount, removeFromCart, url } = useContext(StoreContext)
  const subtotal = getTotalCartAmount()
  const deliveryFee = subtotal === 0 ? 0 : 2
  const total = subtotal + deliveryFee

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list.map((item) => {
          if (!cartItems[item._id]) {
            return null
          }

          return (
            <div key={item._id}>
              <div className="cart-items-title cart-items-item">
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <button type="button" onClick={() => removeFromCart(item._id)}>x</button>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
      <div className="cart-bottom">
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
          <Link className={subtotal === 0 ? 'disabled' : ''} to={subtotal === 0 ? '/cart' : '/order'}>
            Proceed to checkout
          </Link>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />
            <button type="button">Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
