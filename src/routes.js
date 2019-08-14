const Router = require('koa-router');
const ctrl = require('./controllers');
const val = require('./validators');

const router = new Router();

router.get('users', ctrl.users);

// json.users 

module.exports = router;