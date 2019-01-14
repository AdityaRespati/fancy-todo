var express = require('express');
var router = express.Router();
var TeamCon = require('../controllers/teamController')

/* GET teams listing. */
router.get('/', TeamCon.getAll)
router.get('/search', TeamCon.getAll) 
router.get('/:id', TeamCon.getOne)
router.post('/', TeamCon.create)
router.put('/:id', TeamCon.update)
router.delete('/:id', TeamCon.delete)

module.exports = router
