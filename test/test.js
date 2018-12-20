var assert  = require('assert');
chai      = require('chai'),
fs        = require("fs"),
server    = require("../app"),
chaiHttp  = require('chai-http');

chai.use(chaiHttp);


// Test cases for marcopolo game api

describe('/GET getMarcoPoloGame', function() {
  it('successfully getting the result', function(done) {
    chai.request(server).get('/marcoPolo').end(function(err, res) {
      assert.equal(res.status, 200);
      done();
    });
  });

  it('Api is consumed by multiple users simultaneously', function(done) {
    chai.request(server).get('/marcoPolo').end(function(err, res) {
    });
    chai.request(server).get('/marcoPolo').end(function(err, res) {
    });
    chai.request(server).get('/getMarcoPoloGame').end(function(err, res) {
    });
    done();
  });
})