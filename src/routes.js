const Router = require('koa-router');
const UserController = require('./UserController');
const val = require('./validators');

const router = new Router();

router.get('users', UserController);

module.exports = router;