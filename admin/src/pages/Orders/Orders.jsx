import './Orders.css'
import { assets } from '../../assets/assets'

const Orders = () => {
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-item">
        <img src={assets.parcel_icon} alt="" />
        <p>Orders are created in the next tutorial section.</p>
      </div>
    </div>
  )
}

export default Orders
