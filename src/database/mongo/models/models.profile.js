import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
        profilePicture:{
            type: String
        },
})

const modelName = 'Profile'
export const Profile = mongoose.model(modelName, profileSchema)