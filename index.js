module.exports = process.env.hyperion_COV
  ? require('./lib-cov/hyperion')
  : require('./lib/hyperion');
