/**
 * Created by shahqaan on 27/12/2016.
 */

global.log = require('../app/lib/logger');
const mongosetup = require('../mongosetup');
const Articles = require('../app/models/articles');

const RssFeed = require('../app/lib/rss-feed');

// new RssFeed().getNewYorkTimes().then(content => Articles.collection.insert(content));

new RssFeed().getTedTalks().then(content => global.log.debug(content));





