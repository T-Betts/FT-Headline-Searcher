const appModule = require('../../app.js')
const Browser = require('zombie');
// const nock = require('nock


Browser.localhost('example.com', 3000);

describe('FT Searcher homepage', () => {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/', done);
  });

  describe('Basic homepage elements', () => {
    it('should have page title', () => {
      browser.assert.text('#title', 'FT Headline Search App');
    })
  })
})
