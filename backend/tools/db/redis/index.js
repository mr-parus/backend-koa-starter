const redis = require('redis'),
  configs = require('../../../configs'),
  log = require('../../logger/index')(module),
  bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
  host: configs.get('REDIS_HOST'),
  port: configs.get('REDIS_PORT')
});

client.on('connect', () => {
  log.info('Connected to Redis...');
});

client.on('error', e => {
  log.error('Redis Error:\n', e);
});

client.on('warning', w => {
  log.warn('Redis warning:\n', w);
});

module.exports.client = client;
