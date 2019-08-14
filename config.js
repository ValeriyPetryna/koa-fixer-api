const port = process.env.PORT || 3000;
const connectionString = 'mongodb+srv://fixer_user:fixer_password@cluster0-2ycjl.mongodb.net/test?retryWrites=true&w=majority';
const defaultUserPhotoUrl = 'https://www.placecage.com/300/200';

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
};