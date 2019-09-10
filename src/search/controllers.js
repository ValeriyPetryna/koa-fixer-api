const User = require('../accounts/models/user');

exports.workers = async ctx => {
  const allUsers = await User.find({}, 'name surname stack dailyRate email country photo mobile rating company gender username');
  ctx.body = {
    allUsers,
  };
};

exports.sort = async ctx => {
  const { body } = ctx.request;
  // clear empty request params
  Object.keys(body).forEach(key => body[key] == null || (body[key].length < 1 && delete body[key]));
  console.log(body.stack);
  let query = {};
  if (body.country || body.stack || body.name) {
    query.$and = [];
    if (body.country) {
      query.$and.push({ country: body.country });
    }

    if (body.stack) {
      query.$and.push({ stack: body.stack });
    }

    if (body.name) {
      query.$and.push({
        $or: [
          {
            name: {
              $regex: body.name,
              $options: 'i',
            },
          },
          {
            surname: {
              $regex: body.name,
              $options: 'i',
            },
          },
        ],
      });
    }
  }

  try {
    const dailyRate = await User.find(query, 'name surname username email country stack dailyRate rating photo').sort({
      [`${body.sort || 'dailyRate'}`]: -1,
    });

    ctx.response.status = 200;
    ctx.body = {
      sortedArray: dailyRate,
    };
  } catch (err) {
    ctx.body = {
      err,
    };
  }
};

exports.category = async ctx => {
  const categoryUsers = await User.find({ stack: 'Back-end' });
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
