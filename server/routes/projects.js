var express = require('express');
var router = express.Router();
var ProjectCon = require('../controllers/projectController')

/* GET projects listing. */
router.get('/', ProjectCon.getAll)
router.get('/search', ProjectCon.getAll) 
router.get('/:id', ProjectCon.getOne)
router.post('/', ProjectCon.create)
router.put('/:id', ProjectCon.update)
router.delete('/:id', ProjectCon.delete)

module.exports = router
