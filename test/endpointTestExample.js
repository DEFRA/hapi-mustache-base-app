const Lab = require('lab')
const lab = exports.lab = Lab.script()
const Code = require('code')
const server = require('../index')

lab.experiment('Basic HTTP Tests', () => {
  lab.test('GET /site (endpoint test)', (done) => {
    var options = {
      method: 'GET',
      url: '/site'
    }

    // Simulate an http request
    server.inject(options, (response) => {
      //  Expect http response status code to be 200 ('Ok')
      Code.expect(response.statusCode).to.equal(200)

      // Expect some content to be on the returned page
      Code.expect(response.result).to.contain('What\'s the site name?')

      // Expect the content to be of a certain length
      Code.expect(response.result).to.have.length(6051)

      server.stop(done)  // done() callback is required to end the test.
    })
  })
})
