const passport = require('koa-passport');
const jwt = require('jwt-simple');
const User = require('./models/user');
const config = require('../libs/config');
const sendEmail = require('../utils/sendEmail');
const mongoose = require('mongoose');
const uploadS3 = require('../utils/uploadPhotos');

exports.signUp = async ctx => {
  const { body } = ctx.request;
  const user = new User({
    name: body.name,
    surname: body.surname,
    username: body.username,
    email: body.email,
    password: body.password,
  });
  await user.save();
  ctx.status = 201;
  ctx.body = {
    registration: user,
  };
};

exports.signIn = async (ctx, next) => {
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
exports.check = async ctx => {
  const findItem = await User.find({ email: ctx.request.body.email });
  ctx.body = {
    people: findItem,
  };
};
exports.password = async ctx => {
  const body = ctx.request.body;
  await User.findByIdAndDelete(body._id);
  ctx.body = {
    password: body.password,
  };
};

exports.testEmail = async ctx => {
  await sendEmail('valeriypetrina@gmail.com', 'notifications@example.com', 'Hello!', '<p> test data </p>');
  ctx.body = {
    success: true,
  };
};

exports.profile = async ctx => {
  const userID = ctx.state.user._id;
  const user = await User.findById({ _id: userID }, ' photo name surname stack dailyRate email country mobile rating company gender username');
  ctx.body = {
    user,
  };
};

exports.updateUserPhoto = async ctx => {
  const photo = await uploadS3(process.env.AWS_USER_PHOTO_FOLDER, ctx.request.files.photo);

  await User.findByIdAndUpdate(ctx.state.user._id, { photo });
  ctx.body = {
    photo: photo,
  };
};

exports.profileUpdate = async ctx => {
  const { body } = ctx.request;
  await User.findByIdAndUpdate(body._id, body);
  ctx.body = body;
};

exports.deleteUser = async ctx => {
  const userID = ctx.state.user._id;
  try {
    await User.findByIdAndDelete({_id: userID});
    ctx.response.status = 204;
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = {
      err,
    };
  }
}
