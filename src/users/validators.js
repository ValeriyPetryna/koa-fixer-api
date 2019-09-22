const { default: validator, object, string } = require('koa-context-validator');

exports.userValidator = validator({
  body: object().keys({
    category: string().required(),
  }),
});
