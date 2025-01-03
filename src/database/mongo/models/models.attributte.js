import mongoose from "mongoose"

const modelName = 'Attribute'

const attributteSchema  = new mongoose.Schema({
    hashtag:{
        type: String,
        required: true,
        unique: true,
        allowNull: false
    },
      
})


export const Attribute  = mongoose.model(modelName,attributteSchema)