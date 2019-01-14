var express = require('express');
var router = express.Router();
var WorkCon = require('../controllers/workController')

/* GET works listing. */
router.get('/', WorkCon.getAll)
router.get('/search', WorkCon.getAll) 
router.get('/:id', WorkCon.getOne)
router.post('/', WorkCon.create)
router.put('/:id', WorkCon.update)
router.delete('/:id', WorkCon.delete)

module.exports = router;
