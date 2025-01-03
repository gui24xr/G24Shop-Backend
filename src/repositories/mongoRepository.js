export class MongoRepository{

    constructor(getDTOFunction,model,populateFieldsList){
        this.getDTOFunction = getDTOFunction
        this.model = model
        this.populateFieldsList = populateFieldsList
    }

    
    async create({data}){
        try{

        }catch(err){
            console.error(err)
            throw err
        }
    }

    async findById({id}){
        try{
            const result = await this.model.findById(id).populate(this.populateFieldsList)
            return this.getDTOFunction(result)
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async find({query}){
        try{
            const results = await this.model.find({...query})
            const listOfDTO = results.map(item => (this.getDTOFunction(item)))
            return listOfDTO
        }catch(err){
            console.error(err)
            throw err
        }
    }
}
