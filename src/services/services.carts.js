import { CartsRepository } from "../repositories/repositories.carts.js"

const cartsRepository = new CartsRepository()

function getCartDTO(cart){
    console.log('A cart DTO llego este carro para hacer cuentas: ',cart)
    const listWithSubTotalAmounts = cart.productsList.map( productInList => ({
        ...productInList,
        subTotalAmount: Number(productInList.quantity) * Number(productInList.currentPrice)
    }))
    //console.log(listWithSubTotalAmounts)
    const totals = listWithSubTotalAmounts.reduce((accumulator, currentValue) => {
       accumulator.totalAmount += currentValue.subTotalAmount
       accumulator.productsQuantity += currentValue.quantity
       return accumulator;
      },{totalAmount:0, productsQuantity:0});
    
    return{
        id:cart.id,
        products: listWithSubTotalAmounts,
        amount: totals.totalAmount,
        productsQuantity: totals.productsQuantity
    }
}

export class CartsServices{
    async createEmptyCart(){
        try{
            const newCart = await  cartsRepository.create([])
            console.log('New cart en servic e', newCart)
            return getCartDTO(newCart)
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async getCartById(id){
        try{
            const searchedCart = await cartsRepository.findById(id)
            if (!searchedCart) throw new Error('EL carro buscado no existe...')
            return getCartDTO(searchedCart)
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async addProductToCart({cartId,productId,quantity}){
        try{
            const searchedCart = await cartsRepository.findById(cartId)
            if (!searchedCart) throw new Error('EL carro buscado no existe...')
            console.log('Tenemos el carro: ', searchedCart)
            //Recordar compobar stock
            const productsListInCart = searchedCart.productsList
            console.log('ProductsInList: ', productsListInCart)
            //----------------------------------
            const productIndex = productsListInCart.findIndex(productInlist => productInlist.id == productId)
            if (productIndex<0) {
                return  await cartsRepository.addProduct({cartId:cartId,productId:productId,quantity:quantity})
            }
            return await cartsRepository.updateProductQuantity({
                cartId: cartId,
                productId:productId,
                newQuantity: Number(productsListInCart[productIndex].quantity) + Number(quantity),
            })
          
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async clearCart(cartId){
        try{
            return await cartsRepository.clearCart(cartId)
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async deleteProduct({cartId,productId}){
        try{
            return await cartsRepository.deleteProduct({cartId,productId})
        }catch(err){
            console.error(err)
            throw err
        }
    }

    async updateProductQuantity({cartId,productId,newQuantity}){
        try{
            return await cartsRepository.updateProductQuantity({
                cartId: cartId,
                productId:productId,
                newQuantity: Number(newQuantity),
            })
        }catch(err){
            console.error(err)
            throw err
        }
    }

    
  

}