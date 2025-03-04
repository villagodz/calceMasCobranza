import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';
// IMPORTACION DE ROUTES
import authRoutes from './src/routes/auth.routes.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT;

// CONFIGURACIONES
app.use(express.json());

app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
))

app.use(cookieParser());

// USO DE RUTAS  
// Rutas de sesiones
app.use("/api/auth", authRoutes)    



// Iniciamos el servidor
app.listen(PORT, () => {
    //Mostramos mensaje en consola
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});