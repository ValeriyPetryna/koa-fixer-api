const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

//router.get('/profile', passport.authenticate('jwt', { session: false }), ctrl.profile);

//router.put('/photo', passport.authenticate('jwt', { session: false }), ctrl.updateUserPhoto);
//router.put('/profile', passport.authenticate('jwt', { session: false }), ctrl.profileUpdate);

module.exports = router;
