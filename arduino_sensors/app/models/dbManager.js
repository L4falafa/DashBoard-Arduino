//dbUser.js
//Se encarga del manejo de la base de datos actualmente usando MySql
const { query } = require('express');
const mysql = require('mysql');
const config = require('../../config/Config');

//Configuracion de la base de datos por el archivo Config.js
var con = mysql.createConnection({
    host: config.databaseMySql.host,
    user: config.databaseMySql.user,
    password: config.databaseMySql.password,
    database: config.databaseMySql.database
});

//Making MySql query async
async function mySqlQueryAsync (query){
    var result =await new Promise((resolve, reject) => {

        con.query(query, function (err, result, fields) {
            if (err) 
                {
                    console.log(err);
                    reject(err);
                }
            resolve(result);
          });
          
    })
    return result;
}

//Exportar modulo
module.exports = {
    testConnection: ()  => {

        let con = mysql.createConnection({
            host: config.databaseMySql.host,
            user: config.databaseMySql.user,
            password: config.databaseMySql.password, 
            database: config.databaseMySql.database
        });
        
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected Database MySql Host: " + config.databaseMySql.host + " User: " + config.databaseMySql.user + " Database: " + config.databaseMySql.database);
        });
        
    },
    getAllFromTable: async (tableName)=>{
        qry = "SELECT * FROM "+tableName;
        try {
            return await mySqlQueryAsync(qry);
        } catch (error) {
            return error;   
        }
    },
    getFromTable: async (tableName, id)=>{
        qry = "SELECT * FROM "+tableName+" WHERE id = "+id;
        try {
            return await mySqlQueryAsync(qry);
        } catch (error) {
            
            return error;
        }
    },
    removeFromTable: async (tableName, id)=>{
        qry = "DELETE FROM "+tableName+" WHERE id = "+id;
        try {
            return await mySqlQueryAsync(qry);
        } catch (error) {
            return error;
        }
    },
    addToTable: async (tableName, data)=>{
        let qry = "INSERT INTO "+tableName+" (";
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            qry += keys[i];
            if(i != keys.length-1){
                qry += ", ";
            }
        }
        qry += ") VALUES (";
        for (let i = 0; i < keys.length; i++) {
            qry += data[keys[i]];
            if(i != keys.length-1){
                qry += ", ";
            }
        }
        qry += ")";
        try {
            return await mySqlQueryAsync(qry);
        } catch (error) {
            return error;
        }
        
        
    },
    updateTable: async (tableName, data, id)=>{
        let qry = "UPDATE "+tableName+" SET ";
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            qry += keys[i]+" = "+data[keys[i]];
            if(i != keys.length-1){
                qry += ", ";
            }
        }
        qry += " WHERE id = "+id;
        try {
            return await mySqlQueryAsync(qry);
        } catch (error) {
            return error;
        }
    },    
    mySqlQueryAsync: async (query) => { return await mySqlQueryAsync(query) },
    mySqlQueryAsync: async (query, values) => { 
        var result =await new Promise((resolve, reject) => {
            con.query(query, values, function (err, result, fields) {
                if (err) 
                    {
                        console.log(err);
                        reject(err);
                    }
                resolve(result);
              }); 
        })
        return result;
    },
}