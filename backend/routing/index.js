const router = require('koa-router')();

router.use('/api/nodes', require('../api/nodes/routes'));

module.exports = router;
