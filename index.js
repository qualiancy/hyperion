module.exports = process.env.hyperion_COV
  ? require('./lib-cov/hyperion.node')
  : require('./lib/hyperion.node');
