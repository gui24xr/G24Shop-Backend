import express from 'express'
import fs from 'fs'
import { Faker } from '@faker-js/faker'
import { uuid } from 'uuidv4'
import { Category } from '../database/mongo/models/models.category.js'
import { brandsList } from '../../datasets/brands.js'
import { Product } from '../database/mongo/models/models.product.js'
import { Brand } from '../database/mongo/models/models.brand.js'
import { BrandsRepository } from '../repositories/repositories.brands.js'
import { ShippingPackageType } from '../database/mongo/models/models.shippingPackageType.js'
import { ProductRepository } from '../repositories/repositories.products.js'

const brandsRepository = new BrandsRepository()
const productsRepository = new ProductRepository()

export const router = express.Router()

router.get('/brands',async(req,res,next)=>{
    try{
        const result = await brandsRepository.getAll()
        res.status(201).json(result)
    }catch(err){
        console.error(err)
        next(err)
    }
})

router.post('/brands',async(req,res,next)=>{
    try{
        const result = await brandsRepository.create(req.body)
        res.status(201).json(result)
    }catch(err){
        console.error(err)
        next(err)
    }
})

router.post('/brands/create',async(req,res,next)=>{
    try{
        console.log('Aca estamos')
        const createds = []
        let result
        for(const item of brandsList){
            result = await Brand.create(item)
            createds.push(result)
        }
        res.status(201).json(createds)
    }catch(err){
        console.error(err)
        next(err)
    }
})


function readOneFile(filePath) {
    try {
      // Lee el archivo de forma sincrónica
      const data = fs.readFileSync(filePath, 'utf8');
      // Parsea y devuelve el JSON
      return JSON.parse(data);
    } catch (err) {
      console.error('Error al leer o parsear el archivo:', err);
      return null;
    }
  }

  function writeOneFile(filePath,data) {
    try {
      // Lee el archivo de forma sincrónica
     fs.writeFileSync(filePath,data, 'utf8');
      // Parsea y devuelve el JSON
      return 0
    } catch (err) {
      console.error('Error al escribir el archivo:', err);
      return null;
    }
  }



router.get('/products/modify1',async(req,res,next)=>{
    try{

        const products0 = readOneFile('./datasets/products0.json')
        const products1 = products0.map( product => ({
            code: 'pc' + (product.id).toString(),
            title: product.title,
            description: product.description,
            slug: product.title,
            price:{
                originalPrice: Math.floor(product.price/(1-(product.discountPercentage/100))),
                currentPrice: product.price,
                discountPercentage: product.discountPercentage
            },
            rating: product.rating,
            brand: {
                code: null,
                name: product.brand,
                image: '/images/defaultbrand.jpg',
            },
            categories: [
                {code: null, name:product.category}
            ],
            attributes: null,
            gallery:{
                main: '/images/defaultbrandimg.jpg',
                thumbnails: ['/images/defaultthumbnail.jpg']
            },
            stock:{
             quantity: product.stock,
             categories: null
            },
            seller:null

        }))
         
             
        writeOneFile('./datasets/products1.json',JSON.stringify(products1,null,2))
          res.status(201).json(products1)

    }catch(err){
        console.error(err)
        next(err)
    }
})



router.get('/products/modify2',async(req,res,next)=>{
    try{

        const categories = readOneFile('./datasets/categories.json')
        const brands = readOneFile('./datasets/brands.json')
        const productsOriginal = readOneFile('./datasets/products1.json')
     
        const productsModified = productsOriginal.map( product => {

            const searchedBrand = brands.find(brand => brand.name == product.brand.name)

            const searchedCategory = categories.find(category => category.name == product.categories[0].name)

            const newBrand = {
                ...product.brand,
                code: searchedBrand.code
            }

            const newCategory = 
                {
                    code: searchedCategory.code,
                    name: searchedCategory.name
                }
            
            
            return {
                ...product,
                brand: newBrand,
                categories: [newCategory]
            }
        })

        console.log(productsModified)
         
             
        writeOneFile('./datasets/products2.json',JSON.stringify(productsModified,null,2))
          res.status(201).json('products2')

    }catch(err){
        console.error(err)
        next(err)
    }
})




router.get('/products/mongo1',async(req,res,next)=>{
    try{
       
        //await Category.create({name:'pppp',code:'sdgdgdgd',imgUrl:'dgsdfbfd'})
        /*
       const resultsCategory = await Category.find()
        const resultsBrands = await Brand.find()
        const shippingTypes = await ShippingPackageType.find()
        //console.log(resultsCategory)
        const productsOriginal = readOneFile('./datasets/products2.json')
     
    
        const productsModified = productsOriginal.map( product => {

            const randomShippingType = shippingTypes[Math.floor(Math.random() * shippingTypes.length)]
            
            const brandName = product.brand.name
            const brandRecord = resultsBrands.find(brandRecord => brandRecord.name == brandName)
            const newBrandValue = brandRecord._id.toString()
            const newShippingType = randomShippingType._id.toString()

            const categoryName = product.categories[0].name
            const categoryRecord = resultsCategory.find(categoryRecord => categoryRecord.name == categoryName)
           const newCategoriesValue = categoryRecord._id.toString()
            delete(product.attributes)
            delete(product.price.currentPrice)
            const variations = product.stock.categories
            delete(product.stock.categories)
            product.stock.variations = variations
            return {
                ...product,
                brand: newBrandValue,
                categories: [newCategoriesValue],
                specifications:[{tag:'Caracteristica 1', value:'Valor Caracteristica 1'},
                    {tag:'Caracteristica 2', value:'Valor Caracteristica 2'}
                ],
                shippingPackageType: newShippingType,
                enabled: true
            }
        })

        console.log(productsModified)
    
             
        writeOneFile('./datasets/productsmongo1.json',JSON.stringify(productsModified,null,2))
       */
        
       /*
        const product1 = {
            code: "pc1",
            title: "iPhone 9",
            description: "An apple mobile which is nothing like apple",
            slug: "iPhone 9",
            price: {
              originalPrice: 630,
              discountPercentage: 12.96
            },
            rating: 4.69,
            brand: "676db8bc78d1879fc82d3132",
            categories: [
              "676dbc7178d1879fc82d3182"
            ],
            gallery: {
              main: "/images/defaultbrandimg.jpg",
              thumbnails: [
                "/images/defaultthumbnail.jpg"
              ]
            },
            stock: {
              quantity: 94,
              variations: null
            },
            seller: null,
            specifications: [
              {
                tag: "Caracteristica 1",
                value: "Valor Caracteristica 1"
              },
              {
                tag: "Caracteristica 2",
                value: "Valor Caracteristica 2"
              }
            ],
            shippingPackageType: "676de7606ab22feea22ca762",
            enabled: true
          };
          
          
        await Product.create({...product1})
        */
       
          console.log(Product.schema.obj); 
        console.log(ShippingPackageType.schema.obj); 
        const result2 = await Product.find().populate(['brand','categories','shippingPackageType']).lean()
         console.log(ShippingPackageType.schema.obj); 
         const result = await ShippingPackageType.find()
          console.log(result);
          //console.log(result2);
          
        /*  const shippingPackageType1 = {
            name: 'Caja estándar',  // Nombre del paquete
            description: 'Caja de cartón para embalaje de productos estándar',  // Descripción del paquete
            commonUses: ['Embalaje para electrodomésticos', 'Envíos de productos pequeños'],  // Usos comunes del paquete
            translations: {
              es: {
                name: 'Caja estándar',
                description: 'Caja de cartón para embalaje de productos estándar',
                commonUses: ['Embalaje para electrodomésticos', 'Envíos de productos pequeños']
              },
              fr: {
                name: 'Boîte standard',
                description: 'Boîte en carton pour l\'emballage de produits standard',
                commonUses: ['Emballage pour les appareils électroménagers', 'Expéditions de petits produits']
              }
            }
          };
          ShippingPackageType.create({...shippingPackageType1})
       */
          res.status(201).json('result')

    }catch(err){
        console.error(err)
        next(err)
    }
})



router.get('/products/mongo2',async(req,res,next)=>{
  try{
     
      
       const productsOriginal = readOneFile('./datasets/productsmongo1.json')
   
  
     
        res.status(201).json('result<<2222')

  }catch(err){
      console.error(err)
      next(err)
  }
})

router.get('/products',async(req,res,next)=>{
    try{
        const result = await productsRepository.getAll()
        res.status(200).json(result)
    }catch(err){
        console.error(err)
        next(err)
    }
})