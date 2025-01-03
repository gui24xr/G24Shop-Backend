import { Cart } from "../database/mongo/models/models.cart.js"
import { ObjectId } from "bson"

export class CartsRepository{

    transformEntityToDTO(cart){
        console.log('EN transformEntityToDTO: ', cart)
        console.log('EN transformEntityToDTO lista products detallada: ', cart.productsList)
          const transformedId = cart._id.toString() 
          delete cart._id
          return{
              id:transformedId,
              productsList: cart.productsList.map( productInList => ({
                id: productInList.product._id.toString(),
                currentPrice: Math.floor(productInList.product.price.originalPrice/(1-(productInList.product.price.discountPercentage/100))),
                quantity: productInList.quantity
                
              })) 
          }     
      }

    async getEntityDTO({_id}){
        try{
            const filter = {}
            if (_id) filter._id = _id
            const results = await Cart.find({...filter}).populate(['productsList.product']).lean().select('-__v')
            const entityDTOList = results.map(item => (this.transformEntityToDTO(item)))
            return entityDTOList
        }catch(err){
            console.error(err)
            throw err
        }
    }  

    async create(products){
        try{
            const newCart = await Cart.create({products:products})
            if (!newCart) throw new Error('Problemas al crear el carro')
            const createdCartDTO = await this.getEntityDTO({_id:newCart._id})
            return createdCartDTO[0]
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async findById(id){
        try{
            const cartDTOResult = await this.getEntityDTO({_id:new ObjectId(id)})
            if (cartDTOResult.length < 1) return null
            return cartDTOResult[0]
        }catch(err){
            console.error(err)
            throw err
        }
    }


    async addProduct({cartId,productId,quantity}){
        console.log('EL repo agregara producto')
        try{
            const newProductRecord = {
                product: new ObjectId(productId),
                quantity: quantity
            }
            const searchedCart = await Cart.findById(new ObjectId(cartId))
            searchedCart.productsList.push(newProductRecord)
            return await searchedCart.save()
        }catch(err){
            console.error(err)
            throw err
        }
    }
 

    async updateProductQuantity({cartId,productId,newQuantity}){
        console.log('EL repo actualiara producto con ',productId,'   ',newQuantity )
        try{
            const updatedProductRecord = {
                product: new ObjectId(productId),
                quantity: newQuantity
            }
            const searchedCart = await Cart.findById(new ObjectId(cartId))
            const productIndex = searchedCart.productsList.findIndex(productItem=>  productItem.product.equals(new ObjectId(productId))  )
            searchedCart.productsList[productIndex] = updatedProductRecord
            return await searchedCart.save()
        }catch(err){
            console.error(err)
            throw err
        }
    }


    async clearCart(cartId){
        console.log('Se vaciara el carro')
        try{
            const searchedCart = await Cart.findById(new ObjectId(cartId))
            searchedCart.productsList = []
            return await searchedCart.save()
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async deleteProduct({cartId,productId}){
        console.log('Se vaciara el carro')
        try{
            const searchedCart = await Cart.findById(new ObjectId(cartId))
            const productIndex = searchedCart.productsList.findIndex(productItem=>  productItem.product.equals(new ObjectId(productId))  )
            searchedCart.productsList.splice(productIndex,1)
            return await searchedCart.save()
        }catch(err){
            console.error(err)
            throw err
        }
    }

   
}