const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  todo_name : {
    type: String,
    required: [true, "what's your task name?"]
  },
  todo_status : String,
  todo_due_date : {
    type: Date,
    required: [true, "please set the due date for this task"]
  }, 
  created_at: {type: Date, default: new Date},
  todo_description : String,
  todo_category :{
    type: String,
    default: "general"
  },
  todo_user : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }]
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo