var supertest = require('supertest')
var chai = require('chai')
var app = require('../../server')

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.assert = chai.assert;