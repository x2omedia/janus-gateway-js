var Helpers = require('../helpers');
var MediaPlugin = require('./media-plugin');

function MediaEntityPlugin() {
  MediaEntityPlugin.super_.apply(this, arguments);
}

Helpers.inherits(MediaEntityPlugin, MediaPlugin);

/**
 * @param {Object} options
 * @return {Promise}
 */
MediaEntityPlugin.prototype._create = function(options) {
  var body = Helpers.extend({request: 'create'}, options);
  return this.sendWithTransaction({body: body})
    .catch(function(error) {
      if (error.message.indexOf('already exists') > 0) {
        return error.response;
      } else {
        throw error;
      }
    })
    .then(function(response) {
      return response['plugindata']['data'];
    });
};

/**
 * @param {Object} options
 * @return {Promise}
 */
MediaEntityPlugin.prototype._destroy = function(options) {
  var body = Helpers.extend({request: 'destroy'}, options);
  return this.sendWithTransaction({body: body});
};

/**
 * @param {Object} [options]
 * @return {Promise}
 */
MediaEntityPlugin.prototype._list = function(options) {
  var body = Helpers.extend({request: 'list'}, options);
  return this.sendWithTransaction({body: body})
    .then(function(response) {
      return response['plugindata']['data']['list'];
    });
};

module.exports = MediaEntityPlugin;