const express = require('express')
const path = require('path')
const FtService = require('./models/ftService.js');
const ftService = new FtService();
const PORT = process.env.PORT || 3000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    var search = req.query.search || ""
    var page = req.query.page || 1
    ftService.searchForHeadlines(search, page, (apiResponse) => {
      var templateArgs = apiResponse
      templateArgs.currentSearch = search
      templateArgs.currentPage = page
      if(page > 1){
        templateArgs.lastPage = parseInt(page) - 1
      }
      if(!templateArgs.finalPage){
        templateArgs.nextPage = parseInt(page) + 1
      }
      res.render('index', templateArgs)
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
