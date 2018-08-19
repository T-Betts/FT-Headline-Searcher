var FtService = require('../models/ftService.js')
const nock = require('nock')
const expect = require('chai').expect
var setOffset = (offset) => {
  body = {
    "queryString": "title: Example",
    "queryContext": {
      "curations": ["ARTICLES"]
    },
    "resultContext": {
      "maxResults": "20",
      "offset": `${offset}`,
      "contextual": true,
      "highlight": false,
      "aspects": ["title"]
    }
  }
}

describe('FtService', () => {
  describe('#searchForHeadlines', () => {
    it('should give back page 1 of results for a given query', (done) => {
      setOffset(0)
      let serverMock = nock('http://api.ft.com').post('/content/search/v1', body).reply(200, JSON.stringify({ results: [ {results: ['Article'], indexCount: 21 } ], query: { resultContext: { maxResults: 20} } } ));
      ftService = new FtService();
      ftService.searchForHeadlines("Example", 1, (x) => {
        expect(x.articles).to.deep.equal(['Article'])
        done();
      })
    })

    it('should give back page 2 of results for a given query', (done) => {
      setOffset(20)
      let serverMock = nock('http://api.ft.com').post('/content/search/v1', body).reply(200, JSON.stringify({ results: [ {results: ['Article'], indexCount: 21 } ], query: { resultContext: { maxResults: 20} } } ));
      ftService = new FtService();
      ftService.searchForHeadlines("Example", 2, (x) => {
        expect(x.articles).to.deep.equal(['Article'])
        done();
      })
    })

    it('should know if the current specified page IS NOT the last page', (done) => {
      setOffset(0)
      let serverMock = nock('http://api.ft.com').post('/content/search/v1', body).reply(200, JSON.stringify({ results: [ {results: ['Article'], indexCount: 21 } ], query: { resultContext: { maxResults: 20} } } ));
      ftService = new FtService();
      ftService.searchForHeadlines("Example", 1, (x) => {
        expect(x.lastPage).to.not.be.true
        done();
      })
    })

    it('should know if the current specified page IS the last page', (done) => {
      setOffset(0)
      let serverMock = nock('http://api.ft.com').post('/content/search/v1', body).reply(200, JSON.stringify({ results: [ {results: ['Article'], indexCount: 19 } ], query: { resultContext: { maxResults: 20} } } ));
      ftService = new FtService();
      ftService.searchForHeadlines("Example", 1, (x) => {
        expect(x.lastPage).to.be.true
        done();
      })
    })

    it('should return a error if a call to the FT API fails', (done) => {
      setOffset(0)
      let serverMock = nock('http://api.ft.com').post('/content/search/v1', body).replyWithError("Something went wrong")
      ftService = new FtService();
      ftService.searchForHeadlines("Example", 1, undefined, (err) => {
        expect(err.message).to.deep.equal('Error: Something went wrong')
        done();
      })
    })
  })
});
