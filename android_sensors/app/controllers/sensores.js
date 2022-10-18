//sensores.js
//Controlador login y signup
const dbmanager = require("../models/dbManager.js");
const dbManager = require('../models/dbManager.js');

const sensorsTable = "sensores";
module.exports = {
    default:  async (req, res) => {
        res.send('Sensores');
    },
    getAll: (req, res) => {
        //GET /sensores/getAll
        dbManager.getAllFromTable(sensorsTable).then((result) => {
            res.status(200).send(result);
        }).catch((err) => { 
            res.status(400).send(err);
        });

    },
    get: (req, res) => {
        //GET /sensores/get
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
    add: (req, res) => {
        //POST /sensores/add
        const {nombre_sensor, tipo_dato, id_objeto, piso} = req.body;

        if (nombre_sensor == null || tipo_dato == null || id_objeto == null || piso == null){
            res.status(400).send("Error: todos los campos son requeridos");
            return;
        }
        if (isNaN(parseInt(piso))){
            
            res.status(400).send("Error: piso debe ser un numero");
            return;
        }
        //Send Response
        dbManager.mySqlQueryAsync(`INSERT INTO ${sensorsTable} (nombre_sensor, tipo_dato, id_objeto, piso) VALUES (?, ?, ?, ?)`, [nombre_sensor, tipo_dato, id_objeto, piso]).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        });
    },

    remove: (req, res) => {
        //POST /sensores/remove 
        //Removes from the table beepcons the beepcon
        const { id} = req.body;
        
        //Send response
        dbManager.mySqlQueryAsync(`DELETE FROM ${sensorsTable} WHERE id = ?`, [id]).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });

    },
    update: (req, res) => {
        //POST /sensores/update
        
        const {id, nombre_sensor, tipo_dato, id_objeto, piso} = req.body;
        if (id == null || nombre_sensor == null || tipo_dato == null || id_objeto == null || piso == null)
            res.status(400).send("Error: todos los campos son requeridos");
        if (isNaN(parseInt(piso))){
            
            res.send("Error: piso debe ser un numero");
            return;
        }
        //Send Response
        dbManager.mySqlQueryAsync(`UPDATE ${sensorsTable} SET nombre_sensor = ?, tipo_dato = ?, id_objeto = ?, piso = ? WHERE id = ?`, [nombre_sensor, tipo_dato, id_objeto, piso, id]).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
    },
};