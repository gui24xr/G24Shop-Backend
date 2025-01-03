import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    productsList:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
        },
        quantity: {
            type: Number
        }
    }]
})

const modelName = 'Cart'
export const Cart = mongoose.model(modelName, cartSchema)