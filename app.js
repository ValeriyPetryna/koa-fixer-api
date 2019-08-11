const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const appRoutes = require('./src/routes');
const config =  require('./config');

const app = new Koa();
const router = new Router();

mongoose.connect(config.connectionString, {dbName: 'fixer_db', useNewUrlParser: true});


app.use(bodyParser({
   multipart: true,
  }));

router.use("/", appRoutes.routes());
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
