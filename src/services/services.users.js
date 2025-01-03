import { UsersRepository } from "../repositories/repositories.users.js"
import { CartsServices } from "./services.carts.js"
import { ProfilesRepository } from "../repositories/repositories.profiles.js"

const usersRepository = new UsersRepository()
const profilesRepository = new ProfilesRepository()
const cartsService = new CartsServices()

function getUserDTO(user){
    return{
        ...user
    }
}

export class UsersService{
  
    
    async loginRegisterUser(user){
        console.log('USER EN BACKEND: ', user)
        try{
            const searchedUser = await usersRepository.getUserByEmailIfExist(user.email)
            if (searchedUser) {
                console.log('searchedUser:', searchedUser)
                return getUserDTO(searchedUser) //camuflar datos antes del returnn
            }
            else{
                const newUser = await this.createUserWithCart({
                    email: user.email,
                    userName: user.nickname,
                    firstName: user.given_name,
                    lastName:user.family_name,
                    profilePicture: user.picture,
                  })
                return getUserDTO(newUser)
            }

        }catch(err){
            throw err
        }
    }
    
    
    
    async createUserWithCart({email,userName,firstName,lastName,profilePicture}){
        //Registra el user y devuelve el registro, si hubo error lanza excepcion.
        try{
            const cartForUser = await cartsService.createEmptyCart()
            console.log('Cart for userrr: ', cartForUser)
            const profileForUser = await profilesRepository.create({firstName,lastName,profilePicture})
            //Creamos un carro para el user: 
            const createdUser = await usersRepository.create({
                email: email,
                userName: userName,
                firstName: firstName,
                lastName:lastName,
                profile: profileForUser.id,
                cartId: cartForUser.id,
                shippingPoints:[],               
              })
              return createdUser
        }catch(error){
            throw error
        }
    }

    
    
    
}