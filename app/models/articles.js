'use strict';

var mongoose = require('mongoose');

var ArticlesModel = function() {

  var articleSchema = mongoose.Schema({
    url: String,
    content: String,
    title: String,
    tags: [String],
    source: String,
    keywords: [{
      keyword: String,
      count: String,
      positions_in_text: [Number],
      relevance: Number
    }]
  });

  return mongoose.model('articles', articleSchema);
  
};

module.exports = new ArticlesModel();
