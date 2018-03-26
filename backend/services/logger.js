const winston = require('winston'),
  configs = require('../configuration');

const projectRoot = require('path').dirname(require.main.filename),
  DEVELOPMENT = configs.get('NODE_ENV') === 'development',
  getConsoleTransport = label =>
    new winston.transports.Console({
      name: 'console',
      level: 'debug',
      colorize: 'all',
      label
    }),
  getFileTransports = function* getFileTransports() {
    yield new winston.transports.File({
      name: 'error',
      level: 'error',
      filename: `${projectRoot}/logs/error.log`
    });
    if (configs.get('SERVER_LOG_INFO')) {
      yield new winston.transports.File({
        name: 'info',
        level: 'info',
        filename: `${projectRoot}/logs/info.log`
      });
    }
  };

module.exports = module => {
  const label = module.filename.replace(`${projectRoot}/`, '');
  return new winston.Logger({
    name: 'default',
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    },
    colors: {
      warn: 'yellow',
      info: 'cyan'
    },
    transports: DEVELOPMENT ? [getConsoleTransport(label)] : [...getFileTransports()]
  });
};
