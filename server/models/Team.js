
const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
  team_name : {
    type: String,
    required: [true, "what's your team name?"]
  },
  team_description : String,
  team_member : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }],
  team_project: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Project"
  }],
  team_admin: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }]
})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team
