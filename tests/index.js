const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server-production');

chai.use(chaiHttp);
chai.should();

// UNIT TESTING
describe("Flickr", () => {
  // Method GET to / route
  describe("GET /", () => {
    it("should get feeds items", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // Method POST to / route
    it("should not get feeds items", (done) => {
      chai.request(app)
        .post('/')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});