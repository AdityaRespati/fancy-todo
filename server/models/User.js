const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username can't be empty"],
    validate: {
      isAsync: true,
      validator: (value, callback) => {
        User
          .findOne({
            username: value,
            _id: {
              $ne: this._id
            }
          }, (err, user) => {
            if(user){
              callback(false)
            } else{
              callback(true)
            }
          })
      }, 
      msg: "this username is taken. please use another one"
    }
  },
  email: {
    type: String,
    required: [true, "email can't be empty"],
    validate: [{
      validator: value => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
      },
      msg: "invalid email format"
    },
    {
      isAsync: true,
      validator: (value, callback) => {
        User
          .findOne({
            email: value,
            _id: {
              $ne: this._id
            }
          }, (err, user) => {
            if(user){
              callback(false)
            } else{
              callback(true)
            }
          })
      }, 
      msg: "email already in use"
    }]
  },
  password: {
    type: String,
    minlength: [6, 'password must at least contain 6 characters']
  },
  role: {
    type: String,
    enum: ['user', 'admin']
  }
})

UserSchema.pre('save', function(next) {
  const saltRounds = 10
  var salt = bcrypt.genSaltSync(saltRounds)
  var hash = bcrypt.hashSync(this.password, salt)

  this.password = hash

  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
