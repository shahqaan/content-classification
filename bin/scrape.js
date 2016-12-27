/**
 * Created by shahqaan on 27/12/2016.
 */

global.log = require('../app/lib/logger');
const mongosetup = require('../mongosetup');
const MonkeyLearn = require('../app/lib/monkeylearn');
const Articles = require('../app/models/articles');
const osmosis = require('osmosis');

let url = 'http://www.nytimes.com/pages/technology/index.html';

osmosis
  .get(url)
  .follow('@href')
  .find('div.story-body')
  .set('body')
  .then(function(context, data, next) {
    return new MonkeyLearn().getKeywords(data.body).then(keywords => {
      global.log.info('Key words returned: ', keywords.length);
      return Articles.create({url: url, content: data.body, keywords: keywords});
    });
  });



