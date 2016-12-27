var Articles = require('../../../models/articles.js');
module.exports = function (router) {

  router.get('', function(req, res) {


      // I know, this API should return a list but what the hell
      Articles.findOne({email: 'shahqaan@onebyte.biz'}).then(function(user) {

        if (user) { return user; }

        return Users.create({email: 'shahqaan@onebyte.biz'});
      }).then(function(user) {
        res.json(user);
      });

  });

};
