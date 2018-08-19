require('dotenv').config()
const rp = require('request-promise')
const maxResults = 20
var throwError = (err) => {
  throw(err)
}

class FtService {
  constructor() {
  }

  searchForHeadlines(search, page, callback, errorCallback = throwError) {
    var offset = (page - 1) * maxResults
    var query = search === "" ? search : "title: " + search
    var options = {
      method: 'POST',
      url: 'http://api.ft.com/content/search/v1',
      headers: {
        'X-Api-Key': `${process.env.FT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "queryString": `${query}`,
        "queryContext": {
          "curations": ["ARTICLES"]
        },
        "resultContext": {
          "maxResults": `${maxResults}`,
          "offset": `${offset}`,
          "contextual": true,
          "highlight": false,
          "aspects": ["title"]
        }
      })
    }
    rp.post(options)
      .then(function(body){
        var response = JSON.parse(body)
        callback({articles: response.results[0].results, lastPage: response.results[0].indexCount - parseInt(page) * response.query.resultContext.maxResults < 0})
    })
      .catch(function(err){
        errorCallback(err)
    })
  }
}

module.exports = FtService;
