const mongoose = require('mongoose')

const LeaderboardSchema = mongoose.Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true }
})

const LeaderBoard = mongoose.model('Leaderboard', LeaderboardSchema)

module.exports = LeaderBoard;