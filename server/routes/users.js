var express = require('express');
var router = express.Router();
var UserCon = require('../controllers/userController')

router.get('/', UserCon.getAll)
router.get('/search', UserCon.getAll)
router.get('/:id', UserCon.getOne)//view profile
router.post('/', UserCon.create)//registration
router.post('/auth', UserCon.auth)
router.post('/googleauth', UserCon.googleauth )//google signin
router.put('/:id', UserCon.update)//update profile, add workspace to user, add project to user, add work to user, add todo to user
router.delete('/:id', UserCon.delete)//delete profile, admin ban

module.exports = router;
