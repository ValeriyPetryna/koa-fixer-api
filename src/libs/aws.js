const AWS = require("aws-sdk");
const config = require("../libs/config");

const options = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(options);

module.exports = AWS;
