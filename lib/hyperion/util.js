/*!
 * Hyperion - Utilities
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/**
 * Parse the 'Accept' header into an array of
 * acceptable types, sorted by quality.
 *
 * @param {String} header 'Accept'
 * @returns {Array}
 * @name parseAccept
 * @api public
 */

exports.parseAccept = function (accepts) {
  return accepts
    .split(/ *, */)
    .map(function getQuality (line) {
      var str = line.split(/ *; */)
        , q = str[1]
          ? parseFloat(str[1].split(/ *= */)[1])
          : 1
        , types = str[0].split('/')
      return {
          value: str[0]
        , quality: q
        , type: types[0]
        , subtype: types[1]
      };
    })
    .sort(function sortQuality (a, b) {
      return b.quality - a.quality;
    });
};
