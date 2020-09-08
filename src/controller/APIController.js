const express = require('express');
const router = express.Router();
const service = require('../service/APIService');

router.get('/location',service.ListarAll);
router.post('/location',service.add);
router.put('/location/:id',service.update);
router.delete('/location/:id',service.delete);
router.get('/location/:id',service.ListarID);


module.exports = router;