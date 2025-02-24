import sql from 'mssql';
import { configuracion } from './readConfig';

const config = {
    server: configuracion.servidor,
    database: configuracion.nombreDB,
    user: configuracion.usuario,
    password: configuracion.claveBd,
    port: parseInt(configuracion.puerto),
    options: {
        encryhpt: false,
        trustServerCertificate: true
    },
};

let poolPromise;

const getPool = () => {
    if (!poolPromise) {
        poolPromise = new sql.ConnectionPool(config)
            .connect()
            .then(pool => {
                console.log('Conexión a la BD exitosa');
                return pool;
            })
            .catch(err => {
                console.error('Error en la conexión a la BD:', err);
            });
    }
    return poolPromise;
};

export const executeRequest = async ({
    query,
    inputs = [],
    outputs = [],
    isStoredProcedure = false,
}) => {
    try {
        const pool = getPool();
        const request = pool.request();
        
        // Agregar los parámetros de entrada
        inputs.forEach(({ name, type, value }) => {
            request.input(name, type, value);
        });

        // Agregar los parámetros de salida
        outputs.forEach(({ name, type }) => {
            request.output(name, type);
        });

        const result = isStoredProcedure
            ? await request.execute(query)
            : await request.query(query);

        return result;
    } catch (error) {
        console.error('Error en executeRequest:', error
        );
        throw error;
    }
};
