//Requerimiento de modulos
const express = require('express')
const bodyParser = require("body-parser")
const path = require('path');
const cors = require('cors');
const config = require('./config/config.js');


//creacion de la aplicacion express 
const app = express();
const port = config.port; 

//Using cors for react frontend
app.use(cors());

//Body parser para convertir el body en peticiones automaticamente a objetos
app.use(bodyParser.json());  


//#################################
//Carpeta publica de recursos estaticos
app.use(express.static(path.join(__dirname + "/public")));


//#################################
//Camino de las rutas

//const error404 = require('./app/routes/error404');
const sensors = require('./app/routes/sensores');
const objects = require('./app/routes/objects');
const dataSensors = require('./app/routes/dataSensors');

//Se inician las rutas con el controlador
app.use('/sensors', sensors);
app.use('/objects', objects);
app.use('/data_sensors', dataSensors);

//#################################
app.get('/', (req, res) => {
  res.redirect('/inicio');
});


//app.use(error404);
//#################################
 
//Inicio de aplicacion escuchando 
app.listen(port, () => {
  //dbManager.testConnection();
  console.log(`Escuchando en el puertoo ${port}`)
})