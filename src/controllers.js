const mongoose = require('mongoose');
const User = require('./models/user')

exports.users = async (ctx) => {
    const result = await User.find({});
    ctx.set('Access-Control-Allow-Origin', '*');

    ctx.body = {
        users: result
    }
}