const User = require("../accounts/models/user");

exports.workers = async ctx => {
  const allUsers = await User.find();
  ctx.body = {
    allUsers,
  };
};

// exports.workersCountry = async ctx => {
//   const allUsersSelected = await User.find({'name': filters.name});
//   ctx.body = {
//     allUsers,
//   };
// };

// exports.findByName = async ctx => {
//   const { body } = ctx.request;
//   const filteredUsers = await User.findById(body.name, body);
//   ctx.body = {
//     filteredUsers,
//   };
// };
