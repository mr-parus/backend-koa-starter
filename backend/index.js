if (module.parent) {
  process.exit(1);
}
require('./configuration').init();
require('./app').start();
