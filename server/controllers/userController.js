require('dotenv').config()
const User = require('../models/User')
const { OAuth2Client } = require('google-auth-library');
const client_id = process.env.GOOGLE_CLIENT
const client = new OAuth2Client(client_id);
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {
  static create(req, res, next) {

    User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        res
          .status(201)
          .json({
            msg: "create data success",
            data: user
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

  static auth(req, res, next) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign({
              _id: user._id
            }, process.env.JWT_SECRET)

            res
              .status(200)
              .json({
                result: {
                  msg: "sign in success",
                  token
                }
              })
          } else {
            res
              .status(200)
              .json({
                msg: "incorrect username/password"
              })
          }
        } else {
          res
            .status(400)
            .json({
              msg: "username not found"
            })
        }
      })
      .catch(err => {
        res 
          .status(500)
          .json({
            msg: "internal server error",
            err
          })
      })
  }

  static googleauth(req, res, next) {
    // console.log(req.body)
    client.verifyIdToken({
      idToken: req.body.google_token,
      audience: client_id
    })
      .then(ticket => {
        var payload = ticket.getPayload()
        var info_id = null
        // console.log(payload)

        User
          .findOne({
            email: payload.email
          })
          .then(user => {
            if (!user) {
              User
                .create({
                  username: payload.name,
                  email: payload.email
                })
                .then(created => {
                  info_id = created._id
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              info_id = user._id
            }
            res
              .status(200)
              .json({
                msg: "login success",
                token: jwt.sign({ id: info_id }, process.env.JWT_SECRET)
              })
          })
          .catch(err => {
            res
              .status(400)
              .json({
                msg: "internal server error",
                err
              })
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "internal server error",
            err
          })
      })
  }

  static getAll(req, res, next) {
    let query = {}

    if (req.query.q) {
      query = {
        username: {
          $regex: '.*' + req.query.q + '.*',
          $options: 'i'
        }
      }
    }

    User
      .find(query)
      .then(users => {
        res
          .status(200)
          .json({
            msg: "fetch data success",
            data: users
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

    User
      .findOne({
        _id: req.params.id
      })
      .then(user => {
        res
          .status(200)
          .json({
            msg: "fetch data success",
            data: user
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
    User
      .findOneAndUpdate(
        { _id: req.params.id },
        req.body
      )
      .then(() => {
        User
          .findOne({ _id: req.params.id })
          .then(user => {
            res
              .status(200)
              .json({
                msg: "update success",
                updatedData: user
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

    User
      .findOneAndDelete({ _id: req.params.id })
      .then(user => {
        res
          .status(200)
          .json({
            msg: "delete success",
            data: user
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

module.exports = UserController