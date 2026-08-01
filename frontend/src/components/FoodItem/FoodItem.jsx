import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/storeContext'

const FoodItem = ({ id, name, price, description, image }) => {
  const { addToCart, cartItems, removeFromCart, url } = useContext(StoreContext)

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
        {!cartItems[id] ? (
          <button
            className='add'
            type='button'
            onClick={() => addToCart(id)}
            aria-label={`Add ${name}`}
          >
            <img src={assets.add_icon_white} alt="" />
          </button>
        ) : (
          <div className='food-item-counter'>
            <button
              type='button'
              onClick={() => removeFromCart(id)}
              aria-label={`Remove ${name}`}
            >
              <img src={assets.remove_icon_red} alt="" />
            </button>
            <p>{cartItems[id]}</p>
            <button
              type='button'
              onClick={() => addToCart(id)}
              aria-label={`Add another ${name}`}
            >
              <img src={assets.add_icon_green} alt="" />
            </button>
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
