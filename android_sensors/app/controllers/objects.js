//sensores.js
//Controlador login y signup
const dbmanager = require("../models/dbManager.js");
const dbManager = require('../models/dbManager.js');
//get add remove update 
const objectsTable = "objetos";

module.exports = {
    default:  async (req, res) => {
        res.send('Objetos');
    },
    getAll: (req, res) => {
        //GET /sensores/getAll
        dbManager.getAllFromTable(objectsTable).then((result) => {
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
        
        dbmanager.mySqlQueryAsync(`SELECT * FROM ${objectsTable} WHERE id = ?`, [id]).then((result)=>{
            res.status(200).send(result);
        }).catch((error)=>{
            res.status(400).send(error);
        });

    },
    add: (req, res) => {
        //POST /sensores/add
        const { nombre_objeto } = req.body;

        if (nombre_objeto == null){
            res.status(400).send("Error: todos los campos son requeridos");
            return;
        }
        //Send Response
        dbManager.mySqlQueryAsync(`INSERT INTO ${objectsTable} (nombre_objeto) VALUES (?)`, [nombre_objeto]).then((result) => {
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
        dbManager.mySqlQueryAsync(`DELETE FROM ${objectsTable} WHERE id = ? `, [id]).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        });

    },
    update: (req, res) => {
        //POST /sensores/update
        
        const {id, nombre_objeto} = req.body;
        if(id == null || nombre_objeto == null){
            res.status(400).send("Error: todos los campos son requeridos");
            return;
        }
        //Send Response
        let query = `UPDATE ${objectsTable} SET nombre_objeto = ? WHERE id = ?`;
        dbManager.mySqlQueryAsync(query, [nombre_objeto, id]).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        });
    },
    getPanelFromObject: (req, res) => {
        //GET /sensores/getPanelFromObject
        id = req.query.id;
        //Send response
        if (id == undefined || id == null) {
            res.status(400).send("Error: id is undefined or null");
        }
        let panel = {
            id_objeto: id,
            sensores: []
        };
        const query = `SELECT sensores.id, sensores.nombre_sensor, sensores.tipo_dato, sensores.piso, last_data.dato, last_data.fecha
        FROM sensores 
        JOIN(
            SELECT *
            FROM datos_sensores
            WHERE id IN (
               SELECT MAX(id)
               FROM datos_sensores
               GROUP BY id_sensor
            )
        ) AS last_data ON sensores.id = last_data.id_sensor 
        WHERE sensores.id_objeto = ? ORDER BY sensores.id`;
        dbManager.mySqlQueryAsync(query, [id])
        .then((result)=>{
            panel.sensores = result;
            res.status(200).send(panel);
        }).catch((error)=>{
            res.status(400).send(error);
        });
    },
};