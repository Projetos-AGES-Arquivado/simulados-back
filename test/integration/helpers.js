var supertest = require('supertest')
var chai = require('chai')
var app = require('../../app')

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should;