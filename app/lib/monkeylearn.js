/**
 * Created by shahqaan on 27/12/2016.
 */
var request = require('request-promise');

class MonkeyLearn {

  constructor() {}

  getKeywords(content) {
    return request({
      uri: 'https://api.monkeylearn.com/v2/extractors/ex_y7BPYzNG/extract/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token c8f9e862be603eff70b76663437e5783b7c3bf7a'
      },
      method: 'POST',
      body: {text_list: [content]},
      json: true
    }).then(res => res.result[0]);
  }
}

module.exports = MonkeyLearn;
