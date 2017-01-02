/**
 * Created by shahqaan on 28/12/2016.
 */

global.log = require('../../../../app/lib/logger');
const should = require('should');
const request = require('supertest');
const express = require('express');
const kraken = require('kraken-js');
const path = require('path');
const mongoose = require('../../../../mongosetup');

describe('Array', function() {

  let app, mock;

  this.timeout(10000);

  beforeEach(function (done) {
    app = express();
    app.on('start', done);
    app.use(kraken({basedir: path.resolve(__dirname, '../../../../')}));
    mock = app.listen(1337);
  });

  afterEach(function (done) { mock.close(done); });

  describe('chats', function() {

    it('should through error without message', function (done) {
      request(mock)
        .post('/api/v1/chats')
        .expect(400)
        .end(function (err, res) {
          res.status.should.equal(400);
          done();
        });
    });

    it.only('should successfully read message', function (done) {
      request(mock)
        .post('/api/v1/chats')
        .send({message: "What is my name?"})
        .expect(200)
        .end(function (err, res) {
          console.log(res.body);
          res.status.should.equal(200);
          done();
        });
    });
  });
});