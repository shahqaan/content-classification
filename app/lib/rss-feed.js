/**
 * Created by shahqaan on 27/12/2016.
 */
const request = require('request-promise');
const Promise = require('bluebird');
const parseString = Promise.promisify(require('xml2js').parseString);
const osmosis = require('osmosis');
const MonkeyLearn = require('./monkeylearn');
const async = require('async');
const Article = require('../models/articles');
const sleep = require('sleep');

class RssFeed {

  constructor () {}

  getNewYorkTimes() {
    global.log.info('Fetching NewYorkTimes Feed');

    return request({
      uri: 'http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
      json: true
    }).then(res => {

      global.log.info('Fetched NewYorkTimes Feed');

      return parseString(res).then(result => {
        return result.rss.channel[0].item.map(article => {
          let url = article.guid[0]['_'];
          let tags = article.category.map(c => c['_']);
          return {url, tags, source: 'nyt'};
        });

      });

    });
  }

  getTedTalks() {
    global.log.info('Fetching Ted Talks Feed');

    return request({
      uri: 'https://www.ted.com/talks/rss',
      json: true
    }).then(res => {

      global.log.info('Fetched Ted Talks Feed');

      return parseString(res).then(result => {

        return new Promise((resolve) => {

          let i = 0;

          async.mapSeries(result.rss.channel[0].item, (talk, done) => {

            new MonkeyLearn().getKeywords(talk.description[0]).then(keywords => {

              global.log.info(`Fetched keywords for ${++i}/${result.rss.channel[0].item.length}`);

              let talkJson = {
                url: talk.link[0],
                source: 'ted-talks',
                title: talk.title[0],
                content: talk.description[0],
                keywords: keywords
              };

              Article.create(talkJson);

              sleep.sleep(10);

              done(null, talkJson);
            });

          }, (err, talks) => {

            if (err) { resolve({}); }
            else { resolve(talks) };
          });

        });

      });

    });
  }
  
  readArticle(url) {

    global.log.info(`Reading: ${url}`);

    return osmosis
      .get(url)
      .find('div.story-body')
      .set('body')
      .then((context, data, next) => {
        global.log.debug(data);
        return data.body;
        /*
        return new MonkeyLearn().getKeywords(data.body).then(keywords => {
          // global.log.info(`Keywords: ${data.location} | ${keywords.length}`);
          return
          // return Articles.create({url: data.location, content: data.body, keywords: keywords});
        });*/
      });
  }

}

module.exports = RssFeed;