var Articles = require('../../../models/articles.js');
module.exports = function (router) {

  router.get('', function(req, res) {
    Articles.find({}).then(articles => res.json(articles));
  });

};
