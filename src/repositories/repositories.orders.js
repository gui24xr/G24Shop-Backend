import { Order } from "../database/mongo/models/models.orders.js";
import { ObjectId } from "bson"

export class OrdersRepository{

    async createPendingOrder({userId, deliveryMethod,pickUpPointId,deliveryPointId,productsQuantity,amount,items}){
        try{
            const newOrder = await Order.create({
                user: new ObjectId(userId),
                status: 'pending',
                detail:{
                    productsQuantity: productsQuantity,
                    amount: amount,
                    items: items
                },
                delivery:{
                    method: 'pickup',
                    pickupPoint: null,
                    deliveryPoint: null
                }
            })

            return newOrder
        }catch(error){
            console.error(error)
            throw error
        }
    }

    
}