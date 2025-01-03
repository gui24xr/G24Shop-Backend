import mongoose from "mongoose"

const modelName = 'Category'

const categorySchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        allowNull: false
    },
    code:{
        type: String,
        required: false
    },
    imgUrl:{
        type: String,
        required: false
    },
       
})


export const Category  = mongoose.model(modelName,categorySchema)