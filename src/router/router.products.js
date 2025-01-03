import express from 'express'
import { ProductsService } from '../services/services.products.js'

const productsService = new ProductsService()


export const router = express.Router()

router.get('/', async (req,res,next)=>{
    try{
        const {category,brand} = req.query
        const result = await productsService.getProducts({category,brand})
        return res.status(201).json(result)
    }catch(err){
        console.log(err)
        next(err)
    }
})


router.get('/categories', async (req,res,next)=>{
    try{
        const result = await productsService.getCategoriesData()
        return res.status(201).json(result)
    }catch(err){
        console.log(err)
        next(err)
    }
})


router.get('/brands', async (req,res,next)=>{
    try{
        const result = await productsService.getBrandsData()
        return res.status(201).json(result)
    }catch(err){
        console.log(err)
        next(err)
    }
})

router.get('/find', async (req,res,next)=>{
    try{
        const {query} = req.query
        console.log('EN EL FIND LLEGO:: ', query)
        const result = await productsService.findProducts(query)
        return res.status(201).json(result)
    }catch(err){
        console.log(err)
        next(err)
    }
})
