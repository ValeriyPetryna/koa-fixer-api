const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const config = require('./src/libs/config');
const mongo = require('./src/libs/mongo');
const passport = require('./src/libs/passport/index');
const cors = require('@koa/cors');
const http = require('http');
const Chat = require('./src/models/chat');

passport.initialize(); // passport

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

app.use(cors());
const router = new Router();

mongo();

app.use(
  bodyParser({
    multipart: true,
  })
);

router.use('/accounts', require('./src/accounts/routes').routes());
router.use('/search', require('./src/search/routes').routes());
app.use(router.routes());

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

io.on('connection', socket => {
  socket.on('message', msg => {
    io.emit('message', msg);
  });
});
