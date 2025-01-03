import { Product } from "../database/mongo/models/models.product.js";
import { ObjectId } from "bson";

export class ProductRepository{
  
    async  getAll({category,brand,searchQuery,page,limit}){
       try{
         console.log({category,brand, searchQuery})
          
          const filter = {}
          if (brand) filter.brand = new ObjectId(brand)
          if (category) filter.categories = { 
            $in: [
              new ObjectId(category),
            ]}
            if (searchQuery) {
              filter.description = { 
                //***---------- POR ALGUN MOTIVO NO BUSCA, REVISARLO */
                $regex: new RegExp(searchQuery, 'i') // 'i' para insensibilidad a mayúsculas
              };
            }

          const productsList = await Product.aggregate([
            {
              $match: {...filter}
            },
            {
              $lookup:{
                from: "brands",
                localField: "brand",
                foreignField: "_id",
                as: "brand"
              }
            },
            {
              $lookup: {
                from: "categories", 
                localField: "categories",
                foreignField: "_id",     
                as: "categories"    
              }
            },
            {
              $unwind:"$brand",   
            },
            
          
          ])
            
          const listOfDTO = productsList.map(item => this.getProductDTO(item))
          return listOfDTO
       }catch(err){
         throw err
       }
    }

    
    getProductDTO(product){
      return {
          id: product._id.toString(),
          code: product.code,
          title: product.title,
          description: product.description,
          slug: product.slug,
          price: {
            ...product.price,
            currentPrice: Math.floor(product.price.originalPrice/(1-(product.price.discountPercentage/100))),
          },
          rating:product.rating,
          brand: {
            id: product.brand.id,
            name: product.brand.name,
            imgUrl: product.brand.imgUrl
          },
          categories: product.categories.map(category => ({id:category._id,name:category.name})),
          seller: product.seller,
          stock: product.stock,
          enabled: product.enabled,
          gallery: product.gallery,
          specifications: product.specifications,
          stock: product.stock
      }
  }

   async  getById(id){
       try{
        
           
       }catch(err){
         throw err
       }
     }
       async  create(data){
         try{
         
           
         }catch(err){
           throw err
         }
       }
    
       
     async  deleteById(id){
       try{
      
       }catch(err){
         console.error(err)
         throw err
       }
     }
    }
    
    
    