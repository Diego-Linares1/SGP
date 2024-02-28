import oracledb from 'oracledb';
    
import dbConfig from '../config/db.config.js'

const getConnection = async () => {
    try {

        const connection = await oracledb.getConnection(dbConfig);
        
        console.log("Conexión exitosa a la base de datos");
        
        return connection;
    } catch (error) {

        console.error(error);
        
        throw error; 
    }
};

export default getConnection;
