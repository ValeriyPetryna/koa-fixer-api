const Router = require('koa-router');
const ctrl = require('./controllers');
const mongoose = require('mongoose');

const router = new Router();

router.get('/workers', ctrl.workers);
router.post('/workers', ctrl.sort);
router.get('/category', ctrl.category);

//router.get("/filter", ctrl.findByName);

router.get('/profile:id', ctrl.profile);
//router.post('/workers/people/:id', ctrl.people);

module.exports = router;
