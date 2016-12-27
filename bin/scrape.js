/**
 * Created by shahqaan on 27/12/2016.
 */

global.log = require('../app/lib/logger');
const mongosetup = require('../mongosetup');
const MonkeyLearn = require('../app/lib/monkeylearn');

new MonkeyLearn().getKeywords('I like my Mac device').then(keywords => global.log.info(keywords));

mongosetup.connection.close();