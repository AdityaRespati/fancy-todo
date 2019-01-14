var express = require('express');
var router = express.Router();
var usersRoute = require('../routes/users')
var todosRoute = require('../routes/todos')
var worksRoute = require('../routes/works')
var projectsRoute = require('../routes/projects')
var teamsRoute = require('../routes/teams')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRoute)
router.use('/todos', todosRoute)
router.use('/works', worksRoute)
router.use('/projects', projectsRoute)
router.use('/teams', teamsRoute)

module.exports = router;
