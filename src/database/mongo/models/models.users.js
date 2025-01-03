import mongoose from 'mongoose'

const modelName = 'User'

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        allowNull: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        allowNull : false
    },
    password: {
        type: String,
        required: false,
        unique: false,
        allowNull : true
    },
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    shippingPoint:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ShippingPoints'
        }]
    }
})

export const User = mongoose.model(modelName, userSchema)