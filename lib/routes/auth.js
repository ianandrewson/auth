const Router = require('express');
const User = require('../models/User.js');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        res.cookie('session', user.authToken());
        res.send(user);
      })
      .catch(next);
  });
