import express from 'express'
import { CartsServices } from '../services/services.carts.js'

export const router = express.Router()
const cartsService = new CartsServices()
//Obtiene carrito
router.get('/',async (req,res,next)=>{
    try{
        console.log('Req.user en midd: ', req.user)
        const {cartId} = req.query
        const result = await cartsService.getCartById(cartId)
        if (!result) throw new Error("No existe el carro")
        return res.status(200).json(result)
    }catch(err){
        console.log(err)
        next(err)
    }
})

//Limpia carrito
router.delete('/products',async (req,res,next)=>{
    try{
        console.log('Req.user en midd: ', req.user)
        const {cartId} = req.query
        const result = await cartsService.clearCart(cartId)
        return res.status(201).json(result)
    }catch(err){
        console.log(err)
        next(err)
    }
})

//Agregar producto
router.post('/products/:pid',async (req,res,next)=>{
    try{
        console.log('Req.user en midd: ', req.user)
        const {pid:productId} = req.params
        const {cartId,quantity} = req.body
        const result = await cartsService.addProductToCart({
            cartId:cartId,
            productId: productId,
            quantity:quantity
        })
        return res.status(201).json(result)
    }catch(err){
        console.log(err)
        next(err)
    }
})

//deelte product
router.delete('/products/:pid',async (req,res,next)=>{
    try{
        console.log('Req.user en midd: ', req.user, req.body)
        const {pid:productId} = req.params
        const {cartId} = req.body
        const result = await cartsService.deleteProduct({
            cartId: cartId,
            productId:productId
        })
        return res.status(201).json(result)
    }catch(err){
        console.log(err)
        next(err)
    }
})


//update productStock
router.put('/products/:pid',async (req,res,next)=>{
    try{
        console.log('Req.user en midd: ', req.user)
        const {pid:productId} = req.params
        const {cartId,newQuantity} = req.body
        const result = await cartsService.updateProductQuantity({
            cartId:cartId,
            productId: productId,
            newQuantity: newQuantity
        })
        return res.status(201).json({message: 'Actualizado con exito...'})
    }catch(err){
        console.log(err)
        next(err)
    }
})


