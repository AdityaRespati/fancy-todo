const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
  project_name : {
    type: String,
    required: [true, "what's your project name?"]
  },
  project_status : String,
  project_due_date : {
    type: Date,
    default: new Date, 
    required: [true, "please set the due date for this project"]
  }, 
  created_at: {type: Date, default: new Date},
  project_description : String,
  project_member : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }],
  project_work: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Work"
  }],
  project_admin: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }]
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project

