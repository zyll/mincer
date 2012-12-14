/**
 *  class HbsEngine
 *
 *  Engine for the Handlebars template language. You will need `Handlebars` Node modules
 *  installed in order to use [[Mincer]] with `*.hbs` files:
 *
 *     npm install handlebars
 *
 *  This is a "backend" engine of [[JstEngine]].
 *
 *  **NOTICE** Generated functions require you to have `handlebars` client runtime to
 *  be required:
 *
 *  ``` javascript
 *  //= require handlebars-runtime
 *  //= require templates/hello
 *  ```
 *
 *
 *  ##### SUBCLASS OF
 *
 *  [[Template]]
 **/


'use strict';


// 3rd-party
var _ = require('underscore');
var Handlebars;   // initialized later


// internal
var Template  = require('../template');
var prop      = require('../common').prop;


////////////////////////////////////////////////////////////////////////////////


// Class constructor
var HandlebarsEngine = module.exports = function HandlebarsEngineEngine() {
  Template.apply(this, arguments);
};


require('util').inherits(HandlebarsEngine, Template);


// Check whenever coffee-script module is loaded
HandlebarsEngine.prototype.isInitialized = function () {
  return !!Handlebars;
};


// Autoload coffee-script library
HandlebarsEngine.prototype.initializeEngine = function () {
  Handlebars = this.require('handlebars');
};


// Internal (private) options storage
var options = {};


/**
 *  HandlebarsEngine.setOptions(value) -> Void
 *  - value (Object):
 *
 *  Allows to set Handlebars compilation options.
 *  See Handlebars compilation options for details.
 *
 *  Default: `{}`.
 *
 *
 *  ##### Example
 *
 *      HandlebarsEngine.setOptions({self: true});
 **/
HandlebarsEngine.setOptions = function (value) {
  options = _.clone(value);
};


// Render data
HandlebarsEngine.prototype.evaluate = function (context, locals, callback) {
  try {
    var result = "\n(function() {";
    result += "\nthis.HandlebarsTemplates || (this.HandlebarsTemplates = {});";
    result += "\nthis.HandlebarsTemplates['" + context.logicalPath + "'] = Handlebars.template(\n";
    result += Handlebars.precompile(this.data, _.extend({}, options, {}));
    result += "\n);"
    result += "\nreturn this.HandlebarsTemplates['" + context.logicalPath + "'];"
    result += "\n}).call(this);\n"
    callback(null, result.toString());
  } catch (err) {
    callback(err);
  }
};
