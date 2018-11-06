const chai = require('chai');
const assert = chai.assert;
const db = require('../../src/db.js');

const Sequelize = require('sequelize');
const config = require('config').get('db');

// Results

// Tests
describe('/src/db.js', () => {
   describe('module.exports', () => {
      it('is an instance of Sequelize', () => {
         assert(db instanceof Sequelize);
      });
   });
});
