require('../../app.js')
const Browser = require('zombie');
const expect = require('chai').expect
const nock = require('nock')

Browser.localhost('example.com', 3000);

describe('FT Article Searching', () => {

  const browser = new Browser();

  before(function(done) {
    let body = {
      "queryString": "",
      "queryContext": {
        "curations": ["ARTICLES"]
      },
      "resultContext": {
        "maxResults": "20",
        "offset": "0",
        "contextual": true,
        "highlight": false,
        "aspects": ["title"]
      }
    }
    let serverMock = nock('http://api.ft.com').post('/content/search/v1', body).reply(200, JSON.stringify({ results: [ {results: [{title: {title: 'Article Title'} }], indexCount: 21 } ], query: { resultContext: { maxResults: 20} } }))
    browser.visit('/', done);
  });

  it('should return articles with headlines related to a given search', () => {
    let serverMock = nock('http://api.ft.com').post('/content/search/v1').reply(200, JSON.stringify({ results: [ {results: [{title: {title: 'Article Title'} }], indexCount: 21 } ], query: { resultContext: { maxResults: 20} } }))
    browser.fill('search', 'Test');
    browser.pressButton('Search', () => {
      browser.assert.text('#search-term-heading', 'Headlines related to "Test"');
    });
  })
})
