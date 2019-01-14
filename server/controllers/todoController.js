const Todo = require('../models/Todo')

class TodoController {
  static create(req, res, next) {

    Todo
      .create({
        todo_name : req.body.todo_name,
        todo_status : req.body.todo_status,
        todo_due_date : req.body.todo_due_date,
        todo_description : req.body.todo_description,
        todo_category : req.body.todo_category,
        todo_user : req.body.todo_user
      })
      .then(todo => {
        res
          .status(201)
          .json({
            msg: "create data success",
            data: todo
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
        todo_name: {
          $regex: '.*' + req.query.q + '.*',
          $options: 'i'
        }
      }
    }

    Todo
      .find(query)
      .then(todos => {
        res
          .status(200)
          .json({
            msg: "fetch data success",
            data: todos
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

    Todo
      .findOne({
        _id: req.params.id
      })
      .then(todo => {
        res
          .status(200)
          .json({
            msg: "fetch data success",
            data: todo
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
    Todo
      .findOneAndUpdate(
        { _id: req.params.id },
        req.body
      )
      .then(() => {
        Todo
          .findOne({ _id: req.params.id })
          .then(todo => {
            res
              .status(200)
              .json({
                msg: "update success",
                updatedData: todo
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

    Todo
      .findOneAndDelete({ _id: req.params.id })
      .then(todo => {
        res
          .status(200)
          .json({
            msg: "delete success",
            data: todo
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

module.exports = TodoController