const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-body");
const config = require("./src/libs/config");
const mongo = require("./src/libs/mongo");
const passport = require("./src/libs/passport/index");
const cors = require("@koa/cors");

passport.initialize(); // passport

const app = new Koa();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(cors());
const router = new Router();

mongo();

app.use(
  bodyParser({
    multipart: true,
  })
);

router.use("/accounts", require("./src/accounts/routes").routes());
router.use("/search", require("./src/search/routes").routes());
app.use(router.routes());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// io.origins("*:*");
// io.on("connection", socket => {
//   socket.on("submitMessage", payload => {
//     const { message, token } = payload;
//     const userLogin = jwt.decode(token).login;
//     socket.broadcast.emit("newMessage", { message, user: userLogin });
//     socket.emit("newMessage", { message, user: userLogin });
//     console.log(message);
//     console.log("сохраняем ! ЭТУ ШЛЯПУ");
//   });
// });
