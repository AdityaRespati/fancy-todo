const Team = require('../models/Team')

class TeamController {
  static create(req, res, next) {

    Team
      .create({
        team_name: req.body.team_name,
        team_due_date: req.body.team_due_date,
        team_description: req.body.team_description,
        team_member: req.body.team_member,
        team_admin: req.body.team_admin,
        team_project: req.body.team_project
      })
      .then(team => {
        res
          .status(201)
          .json({
            msg: "create data success",
            data: team
          })
      })
      .catch(error => {
        res
          .status(500)
          .json({
            msg: "internal server error",
            error
          })
      })
  }

  static getAll(req, res, next) {
    let query = {}

    if (req.query.q) {
      query = {
        team_name: {
          $regex: '.*' + req.query.q + '.*',
          $options: 'i'
        }
      }
    }

    Team
      .find(query)
      .then(teams => {
        res
          .status(200)
          .json({
            msg: "fetch data success",
            data: teams
          })
      })
      .catch(error => {
        res
          .status(400)
          .json({
            msg: "data not found",
            error
          })
      })
  }

  static getOne(req, res, next) {

    Team
      .findOne({
        _id: req.params.id
      })
      .then(team => {
        res
          .status(200)
          .json({
            msg: "fetch data success",
            data: team
          })
      })
      .catch(error => {
        res
          .status(400)
          .json({
            msg: "data not found",
            error
          })
      })
  }

  static update(req, res, next) {
    Team
      .findOneAndUpdate(
        { _id: req.params.id },
        req.body
      )
      .then(() => {
        Team
          .findOne({ _id: req.params.id })
          .then(team => {
            res
              .status(200)
              .json({
                msg: "update success",
                updatedData: team
              })
          })
      })
      .catch(error => {
        res
          .status(500)
          .json({
            msg: "internal server error",
            error
          })
      })
  }

  static delete(req, res, next) {

    Team
      .findOneAndDelete({ _id: req.params.id })
      .then(team => {
        res
          .status(200)
          .json({
            msg: "delete success",
            data: team
          })
      })
      .catch(error => {
        res
          .status(500)
          .json({
            msg: "internal server error",
            error
          })
      })
  }

}

module.exports = TeamController