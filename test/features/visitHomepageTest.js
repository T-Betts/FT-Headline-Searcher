const appModule = require('../../app.js')
const Browser = require('zombie');
const expect = require('chai').expect
const nock = require('nock')

Browser.localhost('example.com', 3000);

describe('FT Headline Search homepage', () => {

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

  describe('Basic homepage elements', () => {
    it('should have page title', () => {
      browser.assert.text('.title', 'FT Headline Search');
    })

    it('should have a search box', () => {
      browser.fill('search', 'Some Article');
      browser.assert.input('form input[name=search]', 'Some Article')
    })

    it('should load the FT news feed when users first visit the site', () => {
      browser.assert.text('#link-1', 'Article Title')
    })
  })
})
