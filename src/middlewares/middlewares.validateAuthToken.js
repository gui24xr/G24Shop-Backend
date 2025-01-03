
import { JwksClient } from "jwks-rsa";
import jwt from 'jsonwebtoken'


const client = new JwksClient({
    jwksUri: 'https://dev-s1xkcnryhvf7w5v0.us.auth0.com/.well-known/jwks.json'
  });
  
  const getAuth0PublicKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        return callback(err);
      }
      const signingKey =  key.rsaPublicKey;
      callback(null, signingKey);
    });
  }


function readTokenFromRequest(requestObject){
    return requestObject.headers['authorization']?.split(' ')[1];
}

const validateAuthToken = (req, res, next) => {
    //const token = readTokenFromRequest(req)
    const token = req.headers['authorization']?.split(' ')[1];
     console.log('Token en back: ', token)
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
/*
    console.log('Ahora aca: ')
    jwt.verify(token, getAuth0PublicKey, {
        algorithms: ['RS256'],
        audience: 'wlLClvLq5e10XJROGqUCexDkPwyScZKb', // Cambia esto por el identificador de tu API
        issuer: 'https://dev-s1xkcnryhvf7w5v0.us.auth0.com/', // Cambia esto por tu dominio de Auth0
      }, (err, decoded) => {
        if (err) {
            console.log('erroor: ',err)
          return res.status(401).json({ message: 'Token no válido' });
        }
        // Si el token es válido, lo decodificamos y pasamos los datos al siguiente middleware
        console.log('Decode: ', decoded)
        req.user = decoded;  // Aquí tienes los datos del usuario en el token
        next()
        
    })
    */  
   next()
    }



export {
    validateAuthToken
}