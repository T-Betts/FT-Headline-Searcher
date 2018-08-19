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
    ftService.searchForHeadlines("", 1, (apiResponse) => {
      res.render('index', apiResponse)
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
