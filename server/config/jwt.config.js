import jwt from 'jsonwebtoken';



const authenticate = (req, res, next) => {

    const userToken = req.cookies.userToken;    //Obtenemos la cookie con el token

    if (!userToken) {   //Si no existe la cookie
        res.status(401).json({
            errors: { 
                auth: {
                    message: "¡No autorizado!"
                }
            }
        });   //Enviamos un mensaje de error
        return;
    }
    //Si existe la cookie, verificamos el token

    jwt.verify(userToken, process.env.JWT_SECRET, (err, payload) => {
        if (err) {  //Si hay un error
            res.status(401).json({
                errors: {
                    auth: {
                        message: "¡No autorizado!"
                    }
                }
            });   //Enviamos un mensaje de error
            return;
        }
        //Si el token es válido, continuamos con el proceso

        req.user = payload;  //Guardamos el payload en la petición

        next();
    });

};

export default authenticate;