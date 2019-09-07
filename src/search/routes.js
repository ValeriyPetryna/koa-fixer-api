const Router = require("koa-router");
const ctrl = require("./controllers");
const mongoose = require("mongoose");

const router = new Router();

router.get("/workers", ctrl.workers);

//router.get("/filter", ctrl.findByName);

module.exports = router;
