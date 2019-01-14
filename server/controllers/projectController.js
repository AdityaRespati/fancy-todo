
const Project = require('../models/Project')

class ProjectController {
  static create(req, res, next) {

    Project
      .create({
        project_name: req.body.project_name,
        project_status: req.body.project_status,
        project_due_date: req.body.project_due_date,
        project_description: req.body.project_description,
        project_member: req.body.project_member,
        project_admin: req.body.project_admin,
        project_work: req.body.project_work
      })
      .then(project => {
        res
          .status(201)
          .json({
            msg: "create data success",
            data: project
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
        project_name: {
          $regex: '.*' + req.query.q + '.*',
          $options: 'i'
        }
      }
    }

    Project
      .find(query)
      .then(projects => {
        res
          .status(200)
          .json({
            msg: "fetch data success",
            data: projects
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

    Project
      .findOne({
        _id: req.params.id
      })
      .then(project => {
        res
          .status(200)
          .json({
            msg: "fetch data success",
            data: project
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
    Project
      .findOneAndUpdate(
        { _id: req.params.id },
        req.body
      )
      .then(() => {
        Project
          .findOne({ _id: req.params.id })
          .then(project => {
            res
              .status(200)
              .json({
                msg: "update success",
                updatedData: project
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

    Project
      .findOneAndDelete({ _id: req.params.id })
      .then(project => {
        res
          .status(200)
          .json({
            msg: "delete success",
            data: project
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

module.exports = ProjectController