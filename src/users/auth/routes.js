const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.post('/',ctrl.createUser);         //C     Create user
router.get('/',ctrl.readUsers);           //R     Read all existing users
router.get('/:id',ctrl.readUserById);     //R     Read user by Id
router.patch('/:id',ctrl.updateUser);     //U     Update user by Id
router.delete('/:id',ctrl.deleteUser);    //D     Delete user by Id

module.exports = router;