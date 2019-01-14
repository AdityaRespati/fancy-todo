var express = require('express');
var router = express.Router();
var TodoCon = require('../controllers/todoController')

/* GET todos listing. */
router.get('/', TodoCon.getAll)
router.get('/search', TodoCon.getAll) 
router.get('/:id', TodoCon.getOne)
router.post('/', TodoCon.create)
router.put('/:id', TodoCon.update)
router.delete('/:id', TodoCon.delete)

module.exports = router;
