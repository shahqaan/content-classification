var Articles = require('../../../models/articles.js');

module.exports = (router) => {

  router.get('', (req, res) => {
    Articles.find({}).then(articles => res.json(articles));
  });

};
