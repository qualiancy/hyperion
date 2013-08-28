module.exports = process.env.hyperion_COV
  ? require('./lib-cov/server/index')
  : require('./lib/server/index');
