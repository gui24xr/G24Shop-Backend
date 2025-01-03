import mongoose from "mongoose"

const modelName = 'Product'

const productSchema  = new mongoose.Schema({
    code:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        
    },
    price: {
        originalPrice: {
            type: mongoose.Types.Decimal128,  
            
        },
        
        discountPercentage: {
            type: Number,
            
        }
    },
    rating: {
        type: mongoose.Types.Decimal128,  
        
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Brand',  
        
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId ,  
        ref: 'Category',   
    }],
    attributes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attribute',
    }],
    gallery:{
        main: {type: String, required: false, default: null},
        thumbnails: [{
            type: String,
            required: false,
        }]
    },
    stock:{
        quantity:{ type: Number , required: false, default: null},
        variations: [{
            id: {type: Number},
            variationName: {type: String},
            VariationsValues:{
                variationId:{type: Number},
                name:{type:String},
                quantity:{type:Number}
            },
    }],
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller', 
        default:null
    },
    specifications:[{
            tag:{type:String},
            value:{type:String}
        }],
    },
    shippingPackageType:{
        type: mongoose.Schema.Types.ObjectId ,  
        ref: 'ShippingPackageType',  
    },
    
    enabled: {type: Boolean}

})



export const Product  = mongoose.model(modelName,productSchema)