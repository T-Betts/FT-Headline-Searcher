var FtService = require('../models/ftService.js')
const nock = require('nock')
const expect = require('chai').expect

describe('FtService', () => {
  describe('#searchForHeadlines', () => {
    it('should give back page 1 of results for a given query', (done) => {
      let body = {
        "queryString": "title: Example",
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
      let serverMock = nock('http://api.ft.com').post('/content/search/v1', body).reply(200, JSON.stringify({ results: [ {results: ['Article'], indexCount: 21 } ], query: { resultContext: { maxResults: 20} } } ));
      ftService = new FtService();
      ftService.searchForHeadlines("Example", 1, (x) => {
      expect(x.articles).to.deep.equal(['Article'])
      done();
      })
    })

    it('should give back page 2 of results for a given query', (done) => {
      let body = {
        "queryString": "title: Example",
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
      let serverMock = nock('http://api.ft.com').post('/content/search/v1', body).reply(200, JSON.stringify({ results: [ {results: ['Article'], indexCount: 21 } ], query: { resultContext: { maxResults: 20} } } ));
      ftService = new FtService();
      ftService.searchForHeadlines("Example", 2, (x) => {
      expect(x.articles).to.deep.equal(['Article'])
      done();
      })
    })
  })
});
