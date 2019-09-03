const User = require("../accounts/models/user");

exports.people = async ctx => {
  const allUsers = await User.find();
  ctx.body = {
    allUsers,
  };
};
