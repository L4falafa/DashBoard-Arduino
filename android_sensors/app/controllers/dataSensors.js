//sensores.js
//Controlador login y signup
const dbmanager = require("../models/dbManager.js");
const dbManager = require('../models/dbManager.js');
//get add remove update 
const sensorsTable = "datos_sensores";
module.exports = {
    default:  async (req, res) => {
        res.send('Sensores');
    },
    getAll: (req, res) => {
        //GET /data_sensors/getAll
        if(typeof id != "string"){
            res.status(400).send("Error: id is not a string");
        }

        dbManager.getAllFromTable(sensorsTable).then((result) => {
            res.status(200).send(result);
        }).catch((err) => { 
            res.status(400).send(err);
        });

    },
    get: (req, res) => {
        //GET /data_sensors/get
        
        id = req.query.id;
        //Send response
        if (id == undefined || id == null) { 
            res.status(400).send("Error: id is undefined or null");
        }
        
        dbmanager.mySqlQueryAsync(`SELECT * FROM ${sensorsTable} WHERE id = ?`, [id]).then((result)=>{
            res.status(200).send(result);
        }).catch((error)=>{
            res.status(400).send(error);
        });

    },
    getFromSensor: (req, res) => {
        //GET /data_sensors/getFromSensor
        id = req.query.id;
        //Send response
        if (id == undefined || id == null) {
            res.status(400).send("Error: id is undefined or null");
        }
        if(typeof id != "string"){
            res.status(400).send("Error: id is not a string");
        }

        const query = `SELECT  datos_sensores.id, datos_sensores.id_sensor , datos_sensores.dato, datos_sensores.fecha, sensores.nombre_sensor , sensores.tipo_dato, sensores.piso
        FROM datos_sensores INNER JOIN sensores ON datos_sensores.id_sensor = sensores.id WHERE datos_sensores.id_sensor = ?`

        dbmanager.mySqlQueryAsync(query, [id]).then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            res.status(400).send(error);
        });
    },
    add: (req, res) => {
        //POST /data_sensors/add
        const {id_sensor, dato} = req.body;

        if (id_sensor == null || dato == null){
            res.status(400).send("Error: todos los campos son requeridos");
            return;
        }
        if (isNaN(parseFloat(dato))){
            
            res.status(400).send("Error: dato debe ser un numero");
            return;
        }
        
        //Send Response
        dbManager.mySqlQueryAsync(`INSERT INTO ${sensorsTable} (id_sensor, dato) VALUES (?, ?)`, [id_sensor, dato]).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        });
    }
};