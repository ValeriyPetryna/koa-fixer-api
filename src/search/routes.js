const Router = require("koa-router");
const ctrl = require("./controllers");
const mongoose = require("mongoose");

const router = new Router();

router.get("/people", ctrl.people);

module.exports = router;
