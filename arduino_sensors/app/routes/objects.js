//objects.js

var express = require('express');
var router = express.Router();
const controller = require("../controllers/objects");
const { route } = require('./sensores');

router.get('/getAll', controller.getAll);
router.post('/remove', controller.remove);
router.post('/update', controller.update);
router.post('/add', controller.add);
router.get('/get', controller.get);
router.get('/getPanelFromObject', controller.getPanelFromObject);   

module.exports = router;