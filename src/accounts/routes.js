const Router = require('koa-router');
const ctrl = require('./controllers');

const router = new Router();

router.get('/sign-in', ctrl.signIn);
router.get('/sign-up', ctrl.signUp);

// json.users 

module.exports = router;