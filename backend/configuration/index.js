const config = require('./configs');
const env = require('dotenv-save');

exports.init = () =>
  env.config({
    path: `${__dirname}/env/config`,
    example: `${__dirname}/env/config.example`
  });

exports.get = key => config[key] || process.env[key];
