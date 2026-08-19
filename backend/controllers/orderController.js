import Stripe from 'stripe'
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

const placeOrder = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.json({ success: false, message: 'Stripe secret key is missing' })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    })

    await newOrder.save()
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

    const lineItems = req.body.items.map((item) => ({
      price_data: {
        currency: process.env.STRIPE_CURRENCY || 'inr',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * Number(process.env.STRIPE_PRICE_MULTIPLIER || 80),
      },
      quantity: item.quantity,
    }))

    lineItems.push({
      price_data: {
        currency: process.env.STRIPE_CURRENCY || 'inr',
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: 2 * 100 * Number(process.env.STRIPE_PRICE_MULTIPLIER || 80),
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    })

    res.json({ success: true, session_url: session.url })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error' })
  }
}

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body

  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      res.json({ success: true, message: 'Paid' })
    } else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({ success: false, message: 'Not Paid' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error' })
  }
}

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId })
    res.json({ success: true, data: orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error' })
  }
}

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, data: orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error' })
  }
}

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
    res.json({ success: true, message: 'Status Updated' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error' })
  }
}

export { listOrders, placeOrder, updateStatus, userOrders, verifyOrder }
