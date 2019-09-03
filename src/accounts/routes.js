const Router = require("koa-router");
const passport = require("koa-passport");
const ctrl = require("./controllers");

const router = new Router();

router.post("/sign-in", ctrl.signIn);
router.post("/sign-up", ctrl.signUp);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  ctrl.profile
);
router.get("/email", ctrl.testEmail);
router.post("/check-email", ctrl.check);
router.put("/password", ctrl.password);

module.exports = router;
