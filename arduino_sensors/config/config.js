let config = {
    //Configuracion para la conexion a la DB Mysql
    databaseMySql:{
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_NAME || "arduino"        
    },

    //Puerto de la aplicacion express
	port: 3000,
};

module.exports = config;