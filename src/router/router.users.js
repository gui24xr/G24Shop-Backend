import express from 'express'
import { validateAuthToken } from '../middlewares/middlewares.validateAuthToken.js';
import { DataService } from '../services/dataservice.js';
// Middleware para verificar el JWT
import { UsersService } from '../services/services.users.js';
import { UsersRepository } from '../repositories/repositories.users.js';

const usersService = new UsersService()


export const router = express.Router()

router.post('/',validateAuthToken,async(req,res,next)=>{
    //Voy a obtener el token y validarlo.
    //Si no hay token o es invalido devuelvo una respuesta negativa para que el cliente sepa que tiene que cerrar la cesion en el front
    //Si esta todo ok con los datso del token busco/creo el user y lo deviuelvo
    try{
        console.log('Req.user en midd: ', req.user)
        const {user} = req.body
        const result = await usersService.loginRegisterUser(user)
        return res.status(201).json(result)
    }catch(err){
        console.log(err)
        next(err)
    }
})