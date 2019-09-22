const passport = require('koa-passport');
const jwt = require('jwt-simple');
const User = require('./models/user');
const config = require('../libs/config');
const sendEmail = require('../utils/sendEmail');
const mongoose = require('mongoose');
const uploadS3 = require('../utils/uploadPhotos');


exports.testEmail = async ctx => {
  await sendEmail('valeriypetrina@gmail.com', 'notifications@example.com', 'Hello!', '<p> test data </p>');
  ctx.body = {
    success: true,
  };
};
