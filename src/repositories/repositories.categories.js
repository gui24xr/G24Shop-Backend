import { Category } from "../database/mongo/models/models.category.js"

import { MongoRepository } from "./mongoRepository.js"


function getCategoryDTO(category){
    return {
        id: category._id.toString(),
        name: category.name
    }
}


export class CategoriesRepository extends MongoRepository {
    constructor() {
        super(getCategoryDTO, Category, []); 
    }
}