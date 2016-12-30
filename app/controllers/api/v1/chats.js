/**
 * Created by shahqaan on 28/12/2016.
 */

const AIMLInterpreter = require('aimlinterpreter');
const path = require('path');
var aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
const normalizations = require('../../../lib/rosie/substitutions/normal.substitution.json');

const rosie = './app/lib/alice/';
const fs = require('fs');

fs.readdir(rosie, (err, files) => {

  let rosieFiles = files.map(file => {
    return path.join(rosie, file);
  });

  // aimlInterpreter.loadAIMLFilesIntoArray(rosieFiles);

});

// aimlInterpreter.loadAIMLFilesIntoArray(['./app/lib/rosie/maps/be2been.map']);

module.exports = (router) => {

  router.post('/', (req, res) => {

    if (!req.body.message) {
      return res.status(400).json({err: 'message required'});
    }

    let message = ' ' + req.body.message.toLowerCase();


    normalizations.forEach(n => {
      message = message.replace(n[0], n[1]);
    });

    message = message.substr(1);
    message = message.replace(/[\?.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

    res.json(message);


    // aimlInterpreter.findAnswerInLoadedAIMLFiles(req.body.message, function (answer, wildCardArray, input) {
    //   res.json(answer);
    // });

  });

};
