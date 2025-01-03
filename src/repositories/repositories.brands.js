import { Brand } from "../database/mongo/models/models.brand.js";

import { MongoRepository } from "./mongoRepository.js"


function getBrandDTO(brand){
    return {
        id: brand._id.toString(),
        name: brand.name
    }
}


export class BrandsRepository extends MongoRepository {
    constructor() {
        super(getBrandDTO, Brand, []); 
    }
}