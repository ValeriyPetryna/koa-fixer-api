const passport = require('koa-passport');
const jwt = require('jwt-simple');
const User = require('./models/user');
const config = require('../libs/config');

exports.signIn = async (ctx, next) => {
    await passport.authenticate('local', (err, user) => {
        if (user) {
            let payload = {
                id: user._id,
            }
            ctx.body = {
                token: jwt.encode(payload, config.jwtSecret),
                user: {
                    fullName: user.fullName,
                    email: user.email,
                    photo: user.photo
                },
            };
        } else {
            ctx.body = {
                error: err,
            };
        }
    })(ctx, next);
};

exports.signUp = async (ctx) => {
    const user = new User({
        fullName: 'Vasik Pupkin',
        email: 'vasik@pup.com',
        password: 'qwerty',
    });
    await user.save();
    ctx.body = {
        success: true,
    };
};

exports.profile = async (ctx) => {
    ctx.body = 'ONLY FOR USERS';
}