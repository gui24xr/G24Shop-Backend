import express from 'express'
import cors from 'cors'
import { router as productsRouter } from './router/router.products.js';
import { router as usersRouter } from './router/router.users.js';
import { router as cartsRouter } from './router/router.carts.js';
import { router as ordersRouter } from './router/router.orders.js';
import { router as devRouter } from './router/router.devRoutes.js';

export const app = express()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));

  //--------------------------------------------------------------------
  //ENDPOINTS ---------------------------------------------------------//
 app.use('/api/products',productsRouter)
 app.use('/api/users',usersRouter)
 app.use('/api/carts',cartsRouter)
 app.use('/api/orders',ordersRouter)
 app.use('/dev',devRouter)
      

  //--------------------------------------------------------------------
  //--------------------------------------------------------------------

app.use((err, req, res, next) => {
    console.log('LLegue al middkeware de errores')
    console.error(err.stack);
    res.status(500).send(err.message);
}) 



//----------------- probando tokens de auth0 --//////////////////

// Middleware para verificar el JWT
const validateJWT = (req, res, next) => {
    // Obtener el token del encabezado Authorization (Bearer <token>)
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    
}  

app.get('/', validateJWT ,(req,res,next)=>{
    res.status(201).json({message:'Solicitud recibida...'})
})
