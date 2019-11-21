const getRouter = require('koa-router');
const usersRoutes = require('./routes');

const userRouter = getRouter();

userRouter.post('/', usersRoutes.createNewUser);

module.exports.userRoutes = userRouter.routes();
