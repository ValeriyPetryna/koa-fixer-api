const passport = require('koa-passport');
const jwt = require('jwt-simple');
const User = require('./../models/user');
const config = require('./../../libs/config');
const mongoose = require('mongoose');

exports.login = async (ctx, next) => {
  await passport.authenticate('local', (err, user) => {
    if (user) {
      const payload = {
        id: user._id,
        email: user.email,
      };
      ctx.body = {
        token: jwt.encode(payload, process.env.JWT_SECRET),
        user: {
          id: user._id,
          name: user.name,
          surname: user.surname,
          gender: user.gender,
          email: user.email,
          photo: user.photo,
        },
      };
      user.save();
    } else {
      ctx.body = {
        error: err,
      };
    }
  })(ctx, next);
};
