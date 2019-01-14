const mongoose = require('mongoose')

const workSchema = mongoose.Schema({
  work_name: {
    type: String,
    required: [true, "please set the name for this work"]
  },
  work_status: String,
  created_at: {
    type: Date,
    default: new Date
  },
  work_due_date: {
    type: Date,
    default: new Date,
    required: [true, "please set the due date for this work"]
  },
  work_description: String,
  work_user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  work_todo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo"
  }]
})

const Work = mongoose.model('Work', workSchema)

module.exports = Work
