const express = require('express') 
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const router = express.Router()
const User = require('../models/User');

//User

//Login 
router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { username: fetchedUser.username, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        user_id: fetchedUser._id, 
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });  
    });
});


router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        score: 0,
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "Account Created Successfully!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
});



module.exports = router
