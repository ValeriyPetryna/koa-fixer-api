const mongoose = require('mongoose');
const config = require('../../../config');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    fullName: {
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
    passwordHash: {
        type: String,
    },
    salt: {
        type: String,
    },
});

userSchema.virtual('password')
  .set(function (password) {
    if (!password) {
      this.invalidate('password', 'Password can\'t be empty!');
    }

    if (password !== undefined) {
      if (password.length < 6) {
        this.invalidate('password', 'Password can\'t be less than 6 symbols!');
      }
    }

    this._plainPassword = password;

    if (password) {
      this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        config.crypto.hash.iterations,
        config.crypto.hash.length,
        'sha1'
      ).toString('base64');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function () {
    return this._plainPassword;
  });


module.exports = mongoose.model('User', userSchema);