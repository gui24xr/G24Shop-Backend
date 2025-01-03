import express from 'express'
import { DataService } from '../services/dataservice.js'

export const router = express.Router()

//Retorna la orden By id siempre y cuando haya token x serguridad
router.get('/:oid',async(req,res,next)=>{
    try{
        console.log('Req.user en midd: ', req.user)
        const {oid:orderId} = req.params
        const result = await DataService.getOrderById({orderId:orderId})
        if (!result) throw new Error("No existe la order")
        return res.status(200).json(result)
    }catch(err){
        console.log(err)
        next(err)
    }

})
//Retorna las ordenes del user el token, recordar modificar
router.get('/',async(req,res,next)=>{
    
})


//Crea una order para el user del token
//va a crear una orden con los productos del carro del user del token
//esto se hara en la capa de servicios
//queda harcodeado x ahora tanto en front como back
router.post('/',async(req,res,next)=>{
    try{
        console.log('Req.user en midd: ', req.user)
        const {userEmail} = req.body
        const result = await DataService.createOrder({userEmail:userEmail})
        return res.status(201).json(result)
    }catch(err){
        console.log(err)
        next(err)
    }
})