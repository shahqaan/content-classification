'use strict';

var mongoose = require('mongoose');

var ArticlesModel = function() {

  var articleSchema = mongoose.Schema({
    url: {type: String},
    body: {type: String},
    keywords: {type: mongoose.Schema.Types.Mixed}
  });

  return mongoose.model('articles', articleSchema);
  
};

module.exports = new ArticlesModel();
