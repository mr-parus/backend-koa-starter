const mongoose = require('mongoose'),
  util = require('util'),
  configs = require('../../../configuration/index');

const log = require('../../logger')(module),
  mongoURI = `${configs.get('MONGO_PATH')}/${configs.get('MONGO_DATABASE_NAME')}`,
  DEVELOPMENT = configs.get('NODE_ENV') === 'development';

mongoose.Promise = global.Promise;

if (DEVELOPMENT) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    log.debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

exports.connect = () =>
  mongoose
    .connect(mongoURI)
    .then(() => log.info(`Connected to MongoDB: ${mongoURI}`))
    .catch(err => {
      log.error(`Unable to connect to MongoDB: ${mongoURI}`);
      return Promise.reject(err);
    });
