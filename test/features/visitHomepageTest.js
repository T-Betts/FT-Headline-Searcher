const appModule = require('../../app.js')
const Browser = require('zombie');
const expect = require('chai').expect
const nock = require('nock')

Browser.localhost('example.com', 3000);

describe('FT Headline Search homepage', () => {

  const browser = new Browser();

  before(function(done) {
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
  })
})
