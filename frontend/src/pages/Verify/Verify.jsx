import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import { StoreContext } from '../../context/storeContext'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { url } = useContext(StoreContext)
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    const verifyPayment = async () => {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId })
      const result = response.data

      if (result.success) {
        navigate('/myorders')
      } else {
        navigate('/')
      }
    }

    verifyPayment()
  }, [navigate, orderId, success, url])

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
