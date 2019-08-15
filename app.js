const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const config = require('./src/libs/config');
const mongo = require('./src/libs/mongo');
const passport = require('./src/libs/passport/index');

passport.initialize(); // passport

const app = new Koa();
const router = new Router();

mongo();




app.use(bodyParser({
  multipart: true,
}));

router.use("/accounts", require('./src/accounts/routes').routes());
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
