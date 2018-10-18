const chai = require('chai');
const assert = chai.assert;
const app = require('../app.js');

// Results
let reports = app.reports;

describe('app.js', () => {
   describe('reports', () => {
      it('should be an instanceOf array', () => {
         assert.instanceOf(reports, Array);
      });
   });
});