const User = require('./models/user')

exports.signIn = async (ctx) => {
    ctx.body = {
        success: true,
    };
};

exports.signUp = async (ctx) => {
    const user = new User({
        fullName: 'Vasik Pupkin',
        email:'vasik@pup.com',
        password: 'qwerty',
    });
    await user.save();
    ctx.body = {
        success: true,
    };
};