const configs = require('../configuration'),
  Koa = require('koa'),
  bodyParser = require('koa-bodyparser'),
  logger = require('koa-logger-winston'),
  responseTime = require('koa-response-time'),
  router = require('../routing'),
  // cors = require('kcors'),
  mongo = require('../services/db/mongo');

const app = new Koa(),
  log = require('../services/logger')(module),
  SERVER_PORT = configs.get('SERVER_PORT');

app
  .use(responseTime())
  .use(logger(log))
  .use(
    bodyParser({
      jsonLimit: '1kb'
    })
  )
  .use(router.allowedMethods())
  .use(router.routes())
  .use(async ctx => {
    ctx.body = 'HELLO WORLD!';
  })
  .on('error', err => log.error('Error occuped:', err.message));

exports.app = app;
exports.start = async () => {
  try {
    await mongo.connect();
    await app.listen(SERVER_PORT);
    log.info(`Server run at port ${SERVER_PORT}`);
  } catch (err) {
    log.error(`Start Error!\n${err.stack}`);
    process.exit(1);
  }
};
