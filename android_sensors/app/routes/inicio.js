//inicio.js

var express = require('express');
var router = express.Router();
const inicio = require("../controllers/inicio");
const sensores = require("../controllers/sensores");

// GET /inicio - Devuelve la pagina de inicio donde se loguea el usuario
router.get('/', sensores.default);

module.exports = router;