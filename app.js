const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const passport = require('koa-passport'); //реализация passport для Koa
const mongo = require('./src/mongo');

const app = new Koa();
const router = new Router();

mongo();
//mongoose.connect(config.connectionString, { dbName: 'fixer_db', useNewUrlParser: true, useCreateIndex: true });
//mongoose.connection.on('error', console.error);

app.use(passport.initialize()); // passport

app.use(bodyParser({
  multipart: true,
}));

router.use("/accounts", require('./src/accounts/routes').routes());
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
