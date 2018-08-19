require('../../app.js')
const Browser = require('zombie');
const expect = require('chai').expect
const nock = require('nock')
let pageOneBody = {
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
};
let pageTwoBody = {
  "queryString": "",
  "queryContext": {
    "curations": ["ARTICLES"]
  },
  "resultContext": {
    "maxResults": "20",
    "offset": "20",
    "contextual": true,
    "highlight": false,
    "aspects": ["title"]
  }
}

Browser.localhost('example.com', 3000);

describe('Pagination Last Button', () => {

  const browser = new Browser();

  before(function(done) {
    let serverMock = nock('http://api.ft.com').post('/content/search/v1', pageOneBody).reply(200, JSON.stringify({ results: [ {results: [{title: {title: 'Article Title'} }], indexCount: 21 } ], query: { resultContext: { maxResults: 20} } }))
    browser.visit('/', done);
  });

  it('should render page 1 of results and remove "last" button after clicking last on page 2', () => {
    let serverMock = nock('http://api.ft.com').post('/content/search/v1', pageTwoBody).reply(200, JSON.stringify({ results: [ {results: [{title: {title: 'Article Title'} }], indexCount: 21 } ], query: { resultContext: { maxResults: 20} } }))
    browser.fill('input[name=page]', 2)
    browser.pressButton('Search', () => {
      let serverMock = nock('http://api.ft.com').post('/content/search/v1', pageOneBody).reply(200, JSON.stringify({ results: [ {results: [{title: {title: 'Article Title'} }], indexCount: 21 } ], query: { resultContext: { maxResults: 20} } }))
      browser.clickLink('#last-button', () => {
        expect(browser.query('#last-button')).not.to.exist;
      });
    });
  })
})
