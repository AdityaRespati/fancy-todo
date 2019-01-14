const Work = require('../models/Work')

class WorkController {
  static create(req, res, next) {

    Work
      .create({
        work_name: req.body.work_name,
        work_status: req.body.work_status,
        work_due_date: req.body.work_due_date,
        work_description: req.body.work_description,
        work_user: req.body.work_user,
        work_todo: req.body.work_todo
      })
      .then(work => {
        res
          .status(201)
          .json({
            msg: "create data success",
            data: work
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
        work_name: {
          $regex: '.*' + req.query.q + '.*',
          $options: 'i'
        }
      }
    }

    Work
      .find(query)
      .then(works => {
        res
          .status(200)
          .json({
            msg: "fetch data success",
            data: works
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

    Work
      .findOne({
        _id: req.params.id
      })
      .then(work => {
        res
          .status(200)
          .json({
            msg: "fetch data success",
            data: work
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
    Work
      .findOneAndUpdate(
        { _id: req.params.id },
        req.body
      )
      .then(() => {
        Work
          .findOne({ _id: req.params.id })
          .then(work => {
            res
              .status(200)
              .json({
                msg: "update success",
                updatedData: work
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

    Work
      .findOneAndDelete({ _id: req.params.id })
      .then(work => {
        res
          .status(200)
          .json({
            msg: "delete success",
            data: work
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

module.exports = WorkController