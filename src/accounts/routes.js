const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.post('/sign-in', ctrl.signIn);
router.post('/sign-up', ctrl.signUp);
router.post('/check-email', ctrl.check);

router.get('/email', ctrl.testEmail);
router.get('/profile', passport.authenticate('jwt', { session: false }), ctrl.profile);

router.put('/password', ctrl.password);
router.put('/photo', passport.authenticate('jwt', { session: false }), ctrl.updateUserPhoto);
router.put('/profile', passport.authenticate('jwt', { session: false }), ctrl.profileUpdate);

router.delete('/destroy',passport.authenticate('jwt', { session: false }), ctrl.deleteUser);

module.exports = router;
