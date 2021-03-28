const express = require('express')
const router = express.Router()

const LeaderBoard = require('../models/Leaderboard');

//Leaderboard

//Setting score
router.post("/leaderboard",  (req, res, next) => {
   const score =  new LeaderBoard({
       username: req.body.username,
       score: req.body.score
   })

   score.save().then(newScore => {
    res.status(201).json({
        message: "New Score is Set",
        score: {
            score: newScore.score
        }
    })
   })
})

//Getting Score
router.get("/leaderboard", async  (req, res, next) => {
    try {
        let result = await LeaderBoard.find({}).sort({ score: -1 })
        res.send(result);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
})

 module.exports = router
