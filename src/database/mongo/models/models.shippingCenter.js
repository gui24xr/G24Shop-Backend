import mongoose from 'mongoose'

const modelName = 'ShippingPoint'

const shippingPointSchema = new mongoose.Schema({
    street:{
        type: String,
        required: true,
    },
})

export const ShippingPoint = mongoose.model(modelName, shippingPointSchema)