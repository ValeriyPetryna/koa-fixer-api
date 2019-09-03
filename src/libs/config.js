const port = process.env.PORT || 3000;
const connectionString =
  "mongodb+srv://fixer_user:fixer_password@cluster0-2ycjl.mongodb.net/test?retryWrites=true&w=majority";
const defaultUserPhotoUrl = "https://www.placecage.com/300/200";

module.exports = {
  port,
  connectionString,
  defaultUserPhotoUrl,
  crypto: {
    hash: {
      length: 100,
      iterations: 100,
    },
  },
  jwtSecret: "asdasdascv11!2",
  sendGrid: {
    apiKey:
      "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",
  },
  aws: {
    accessKeyId: "AKIAVUM7TYM4QDPFLUXV",
    secretAccessKey: "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",
    bucketName: "fixer-app",
    userPhotoFolder: "user-photos",
  },
};
