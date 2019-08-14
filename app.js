const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const appRoutes = require('./src/routes');
const config = require('./config');
const passport = require('koa-passport'); //реализация passport для Koa
const LocalStrategy = require('passport-local'); //локальная стратегия авторизации
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT



const app = new Koa();
const router = new Router();

mongoose.connect(config.connectionString, { dbName: 'fixer_db', useNewUrlParser: true });

app.use(passport.initialize()); // сначала passport

app.use(bodyParser({
  multipart: true,
}));

router.use("/", appRoutes.routes());
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
