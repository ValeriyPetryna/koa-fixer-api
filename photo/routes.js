const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.patch('/', passport.authenticate('jwt', { session: false }), ctrl.uploadUserPhoto);

module.exports = router;
