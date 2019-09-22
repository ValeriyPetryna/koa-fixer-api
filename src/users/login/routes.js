const Router = require('koa-router');
const ctrl = require('./controllers');

const router = new Router();

router.post('/',ctrl.login);       // Login user

module.exports = router;
