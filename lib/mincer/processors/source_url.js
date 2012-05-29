/**
 *  class SourceURL
 *
 *  Adds little 'meta comments' that the browser can use for finding the names
 *  of scripts. This means that instead of seeing one compiled file in Chrome's
 *  inspector, you'll see your whole directory tree.
 *
 *  Idea was shamelessly taken from maccman's sprockets' extension:
 *  https://github.com/maccman/sprockets-source-url
 *
 *  This behavior is *disabled* by default, and can be enabled with:
 *
 *      environment.registerPostProcessor('application/javascript', SourceURL);
 *
 *
 *  ##### SUBCLASS OF
 *
 *  [[Template]]
 **/


'use strict';


// internal
var Template = require('../template');


////////////////////////////////////////////////////////////////////////////////


// Class constructor
var SourceURL = module.exports = function SourceURL() {
  Template.apply(this, arguments);
};


require('util').inherits(SourceURL, Template);


// Process data
SourceURL.prototype.evaluate = function (context, locals, callback) {
  try {
    this.data = 'eval("' + this.data.replace(/\\/g, '\\\\').replace(/"/g, '\\"') +
                '"+ "\n//@ sourceURL=/' + context.logicalPath + '"' +
                ');\n';
    callback(null, this.data);
  } catch (err) {
    callback(err);
  }
};
