const passport = require('koa-passport');
const jwt = require('jwt-simple');
const User = require('./../models/user');
const config = require('./../../libs/config');
const sendEmail = require('./../../utils/sendEmail');
const mongoose = require('mongoose');
const uploadS3 = require('./../../utils/uploadPhotos');

const normalizeQuery = query => {
  let normalized = { ...query };
  const allowed = ['name', 'surname', 'fullname', 'username', 'email', 'gender', 'country', 'stack', 'dailyrate', 'mobile', 'photo', 'rating', 'company'];
  Object.entries(normalized).forEach(([key, value]) => {
    if (!allowed.includes(key) || typeof value !== 'string' || !value.length > 0) {
      delete normalized[key];
    } else if (key == 'fullname') {
      normalized.fullname = {
        $regex: value,
        $options: 'i',
      };
    }
  });

  return normalized;
};

exports.createUser = async ctx => {
  const { body } = ctx.request;
  const user = new User({
    name: body.name,
    surname: body.surname,
    username: body.username,
    email: body.email,
    password: body.password,
    fullname: body.fullname,
  });
  await user.save();
  ctx.status = 201;
  ctx.body = {
    registration: user,
  };
};

exports.readUsers = async ctx => {
  const query = normalizeQuery(ctx.request.query);
  try {
    const users = await User.find(query, 'name surname fullname stack dailyRate email country photo mobile rating company gender username').sort({
      [`${ctx.request.query.sort || 'dailyRate'}`]: -1,
    });
    ctx.response.status = 200;
    ctx.body = {
      code: 200,
      message: 'Fetched users successfully',
      users,
    };
  } catch (err) {
    ctx.body = {
      err,
    };
  }
};

exports.readUserById = async ctx => {
  const user = await User.findById(ctx.params.id);
  ctx.body = {
    user,
  };
};

exports.updateUser = async ctx => {
  const { body } = ctx.request;
  await User.findByIdAndUpdate(body._id, body);
  ctx.body = body;
};

exports.deleteUser = async ctx => {
  const userID = ctx.params.id;
  try {
    const user = await User.findById(userID);
    await user.remove();
    ctx.response.status = 204;
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = {
      err,
    };
  }
};
