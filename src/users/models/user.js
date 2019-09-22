const mongoose = require('mongoose');
const config = require('../../libs/config');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  fullname:{
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    /*validate: {
            validator: function checkEmail(value) {
    
            },
            message: props => `${props.value} is not a valid email.`
        }*/
  },
  photo: {
    type: String,
    default: process.env.DEFAULT_USER_PHOTO,
  },
  gender: {
    type: String,
  },
  country: {
    type: String,
    default: 'Ukraine',
  },
  stack: {
    type: String,
    default: 'Back-end',
  },
  dailyRate: {
    type: Number,
    default: 300,
  },
  mobile: {
    type: String,
    default: 000 - 000 - 00,
  },
  rating: {
    type: Number,
    default: 3,
  },
  company: {
    type: String,
  },
  token: {
    type: String,
    default: 'token',
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  },
});

userSchema
  .virtual('password')
  .set(function(password) {
    if (!password) {
      this.invalidate('password', "Password can't be empty!");
    }
    if (password !== undefined) {
      if (password.length < 6) {
        this.invalidate('password', "Password can't be less than 6 symbols!");
      }
    }

    this._plainPassword = password;

    if (password) {
      this.salt = crypto.randomBytes(100).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 100, 100, 'sha1').toString('base64');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function() {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  if (!this.passwordHash) return false;

  return crypto.pbkdf2Sync(password, this.salt, 100, 100, 'sha1').toString('base64') === this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);
