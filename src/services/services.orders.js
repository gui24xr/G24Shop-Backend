import { deliveryMethodsList } from "../config/deliberyMethods.js";
import { paymentMethodsList } from "../config/paymentsMethods.js";
import { OrdersRepository } from "../repositories/repositories.orders.js";
import { CartsServices } from "./services.carts.js";

const ordersRepository = new OrdersRepository()
const cartsService = new CartsServices()
export class OrdersService{

    getDeliveryMethodsList(){
        return deliveryMethodsList
    }

    getPaymentsMethodsList(){
        return paymentMethodsList
    }

    async createPendingOrderFromCart({userId,cartId}){
        try{

            const searchedCart = await cartsService.getCartById(cartId)
            console.log('EL carro para la orden es: ', searchedCart)
            const newOrder = await ordersRepository.createPendingOrder({
                userId,
                productsQuantity: searchedCart.productsQuantity,
                amount: searchedCart.amount,
                items: searchedCart.products
            })

            await cartsService.clearCart(searchedCart.id)
            return newOrder
        }catch(error){
            console.log(error)
            throw error
        }
    }
}