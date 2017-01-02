/**
 * Created by shahqaan on 28/12/2016.
 */

const aimlHigh = require('aiml-high');
const path = require('path');
var interpreter = new aimlHigh({name:'Shahqaan', age:'42'});
const requireDir = require('require-dir');
const substitutions = requireDir('../../../lib/bot/substitutions');

const rosie = './app/lib/bot/aiml/';
const fs = require('fs');

fs.readdir(rosie, (err, files) => {

  let rosieFiles = files.map(file => {
    return path.join(rosie, file);
  });

  interpreter.loadFiles(rosieFiles);

});

module.exports = (router) => {

  router.post('/', (req, res) => {

    if (!req.body.message) {
      return res.status(400).json({err: 'message required'});
    }

    let message = ' ' + req.body.message.toLowerCase();


    substitutions.normal.forEach(n => {
      message = message.replace(n[0], n[1]);
    });

    message = message.substr(1);
    message = message.replace(/[\?.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

    interpreter.findAnswer(message, function (answer, wildCardArray, input) {

      res.json({answer});
    });

  });

};
