const express = require('express');
const router = express.Router();
const controller = require('../controller/ControllerAPI');

router.get('/location',controller.ListarAll);
router.post('/location',controller.add);
router.put('/location/:id',controller.update);
router.delete('/location/:id',controller.delete);
router.get('/location/:id',controller.ListarID);


module.exports = router;