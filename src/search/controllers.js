const User = require("../accounts/models/user");

exports.workers = async ctx => {
  const allUsers = await User.find();
  ctx.body = {
    allUsers,
  };
};
exports.sort = async ctx => {
  const { body } = ctx.request;
  console.log(body);
  // const Sorted = await User.find(
  //   { country: body.country },
  //   "name stack dailyRate"
  // );
  const param = body.sort;
  if (param !== "by price" || param !== "by rating") {
    ctx.response.status = 404;
    ctx.body = {
      error: "Only price and rating params are available",
    };
  }
  try {
    if (param === "by price") {
      const dailyRate = await User.find(
        { country: body.country },
        "name stack dailyRate"
      ).sort({ dailyRate: -1 });
      ctx.response.status = 200;
      ctx.body = {
        workers: dailyRate,
      };
    }
    if (param === "by rating") {
      const rating = await User.find("name stack dailyRate").sort({
        rating: -1,
      });
      ctx.response.status = 200;
      ctx.body = {
        workers: rating,
      };
    }
  } catch (err) {
    ctx.body = {
      err,
    };
  }
  console.log(ctx.body);
  // ctx.body = {
  //   Sorted,
  // };
};

exports.category = async ctx => {
  const categoryUsers = await User.find({ stack: "Back-end" });
  ctx.body = {
    categoryUsers,
  };
};

exports.profile = async ctx => {
  const profile = await User.findById(ctx.params.id);
  ctx.body = {
    profile,
  };
};
