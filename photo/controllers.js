const passport = require('koa-passport');
const jwt = require('jwt-simple');
const User = require('./models/user');
const config = require('../libs/config');
const mongoose = require('mongoose');
const uploadS3 = require('../utils/uploadPhotos');

// TODO: concat 2 methods into 1 ( updateUser = updateUserPhoto + profileUpdate) ???

exports.uploadUserPhoto = async ctx => {
  const photo = await uploadS3(process.env.AWS_USER_PHOTO_FOLDER, ctx.request.files.photo);

  ctx.body = {
    photo: photo,
  };
};
