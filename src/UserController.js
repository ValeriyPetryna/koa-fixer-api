const mongoose = require('mongoose');
const User = require('./models/user')
const Router = require('koa-router');

router.get('', async (ctx) => {
    const result = await User.find({});
    ctx.set('Access-Control-Allow-Origin', '*');

    ctx.body = {
        users: result
    }
});

router.get(':id', async (ctx) => {
    const found = await User.findById(ctx.params.id);
    ctx.set('Access-Control-Allow-Origin', '*');

    ctx.body = {
        user: found
    }
});

module.exports = router;
