//inicio.js

var express = require('express');
var router = express.Router();
const controller = require("../controllers/dataSensors");

router.get('/getAll', controller.getAll);
router.post('/add', controller.add);
router.get('/get', controller.get);
router.get('/getFromSensor', controller.getFromSensor);


module.exports = router;