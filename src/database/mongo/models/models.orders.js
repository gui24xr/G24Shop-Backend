import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({
    user:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    delivery:{
      method: {
            type: String,
            enum: ['pickup', 'shipping', 'agreementwithseller'],
            required: true
        },
      pickupPoint:{
          type: String,
          default: null
      },
      deliveryPoint: {
        type: String,
        default: null
      }
    },
    detail: {
        productsQuantity: {
            type: Number
        },
        amount: {
            type: Number
        },
        items:[{
            title: {
              type: String,
              required: true
            },
            brand: {
              type: String,
              required: true
            },
            currentPrice: {
              type: Number,
              required: true
            },
            quantity: {
              type: Number,
              required: true
            },
            subTotalAmount: {
              type: Number,
              required: true
            }
          }]
    },

  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  }

}, {
    timestamps: true
  })

const modelName = 'Order'
export const Order = mongoose.model(modelName,orderSchema)