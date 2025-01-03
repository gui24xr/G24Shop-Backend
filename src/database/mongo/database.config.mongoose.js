import mongoose from 'mongoose'

const DB_URL = 'mongodb+srv://gui24xrdev:2485javiersolis@cluster0.a6zgcio.mongodb.net/shopg24v2?retryWrites=true&w=majority&appName=Cluster0'


export async function connectToDatabase(){
    try{
        await mongoose.connect(DB_URL)
        console.log('Conectado a la base de datos...!')
    }catch(err){
        console.error('Error al conectarse a la base datos.')
        throw err
    }

}