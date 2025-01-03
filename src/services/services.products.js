import { ProductRepository } from "../repositories/repositories.products.js"
import { CategoriesRepository } from "../repositories/repositories.categories.js"
import { BrandsRepository } from "../repositories/repositories.brands.js"

const categoriesRepository = new CategoriesRepository()
const brandsRepository = new BrandsRepository()


export class ProductsService{
    repository = new ProductRepository()
    async getProducts({category,brand}){
        try{
            const result = await this.repository.getAll({category:category,brand:brand})
            return result
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async getCategoriesData(){
        try{
            const result = await categoriesRepository.find({})
            return result
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async getBrandsData(){
        try{
            const result = await brandsRepository.find({})
            return result
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async findProducts(query){
        try{
            const result = await this.repository.getAll({searchQuery:query})
            return result
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async getProductById(productId){
        try{

        }catch(err){
            console.error(err)
            throw err
        }
    }

    
}
