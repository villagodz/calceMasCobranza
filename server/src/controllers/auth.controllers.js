import { executeRequest } from '../utils/dbHandler.js';
import sql from 'mssql';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { user, password } = req.body; 
    // Llamamos al procedimiento almacenado sp_usuarioPass
    const result = await executeRequest({
      query: 'sp_usuarioPass',
      inputs: [
        { name: 'usuario', type: sql.VarChar, value: user },
        { name: 'pass', type: sql.VarChar, value: password }
      ],
      isStoredProcedure: true
    });

    // Verificamos que el procedimiento haya devuelto resultados
    if (!result || !result.recordset || result.recordset.length === 0) {
      return res.status(400).json({ error: 'No se obtuvo respuesta del procedimiento almacenado' });
    }

    const authCode = result.recordset[0].resultado;

    // Si el código es 1 o 2: usuario o contraseña inválido
    if (authCode === 1 || authCode === 2) {
      return res.status(400).json({
        errors: {
          usuario: { message: 'Usuario o contraseña inválidos' }
        }
      });
    }

    // Si el código es 3: acceso concedido
    if (authCode === 3) {
      // Opcional: puedes obtener otros datos del usuario si el SP los retorna, por ejemplo un id
      const userId = result.recordset[0].idUsuario || user;
      const resultado = result.recordset[0].resultado;
      // ESTO IMPLEMENTAR CUANDO QUIERA UTILIZAR JWT
      /*
      // Generamos el token JWT
      const token = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
      
     return res.status(200)
        .cookie('userToken', token, { httpOnly: true })
        .json({ token });
      */
     return res.status(200).json({
        "resultado": resultado,
        "userId": userId
     })
    }

    // Si se devuelve otro código, manejamos el error de forma genérica
    return res.status(500).json({ error: 'Error en el procedimiento almacenado' });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json(error);
  }
};


/*export const logout = async (req, res) => {
    res.status(200).clearCookie("userToken").json({});
};

export const session = async (req, res) => {
    res.status(200).json(req.user);
};*/