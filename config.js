const port = process.env.PORT || 3000;
const connectionString = 'mongodb+srv://fixer_user:fixer_password@cluster0-2ycjl.mongodb.net/test?retryWrites=true&w=majority';

module.exports = {
    port, 
    connectionString
};