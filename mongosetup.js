/**
 * Created by shahqaan on 27/12/2016.
 */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var mongoString = require('./config/mongo.json').url;

var mongoLogger = function(coll, method, query, doc) {
  global.log.debug(coll + '.' + method + '( ' + JSON.stringify(query) +  ', ' + JSON.stringify(doc) + ' )');
};

mongoose.set('debug', true); // mongoose.set('debug', mongoLogger)

mongoose.connect(mongoString, function(error, db) {
  if (error) {
    global.log.error(err);
  } else {
    global.log.info('Connected to MongoDB');
  }
});

module.exports = mongoose;

