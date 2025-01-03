import { User } from "../database/mongo/models/models.users.js"
import { ObjectId } from "bson";


export class UsersRepository {

  //Esta funcion es totalmente privada del repo

  transformEntityToDTO(user){
    console.log('userendto ', user)
      return{
          id: user._id.toString(),
          userName: user.userName,
          password: user.password,
          email:user.email,
          profile: {
            id: user.profile._id.toString(),
            firstName: user.profile.firstName,
            lastName: user.profile.lastName
          },
          cartId: user.cartId.toString(),
      }
  }

  async getEntityDTO({_id,email,userName,cartId,profileId,page,limit}){
    try{
      const filter = {}
      if (_id) filter._id = _id
      if (email) filter.email = email
      if (userName) filter.userName = userName 
      if(cartId) filter.cartId = cartId
      if(profileId) filter.profileId = profileId

      const results = await User.find({...filter}).populate(['profile']).lean().select('-__v')
      const entityDTOList = results.map(item => (this.transformEntityToDTO(item)))
      return entityDTOList
    }catch(err){
      console.error(err)
      throw new err
    }
  }


  async create({email,userName,password,profile,cartId,shippingPoints}){
    try{
        const newUser = await User.create({
            email,userName,password,profile,cartId:new ObjectId(cartId), shippingPoints
        })
        if (!newUser) throw new Error('Problemas al crear el user...')
        const createdUserDTO = await this.getEntityDTO({_id:newUser._id})
        return createdUserDTO[0]
        }
        catch(err){
          console.error(err)
          throw err
    }
  }

  async  getById(id){
    try{
        const userDTOResult = await this.getEntityDTO({_id:new ObjectId(id)})
        if (userDTOResult.length < 1) return null
        return userDTOResult[0]
    }catch(err){
    console.error(err)
      throw err
    }
  }

  async  getUserByEmailIfExist(email){
    try{
      const userDTOResult = await this.getEntityDTO({email:email})
      if (userDTOResult.length < 1) return null
      return userDTOResult[0]
    }catch(err){
    console.error(err)
      throw err
    }
  }

  
}