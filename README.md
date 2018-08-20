# FT-Headline-Searcher
This application allows users to search for and view headlines from the Financial Times via use of the FT Headline Licence. It was developed in a test driven manner using the testing framework Mocha in conjunction with the assertion library Chai, and uses Zombie as a headless browser. It was built with the Node.js web application framework 'Express', along with various other Node packages which can be viewed in the dependencies section of the package.json file.

## User Stories
```
As a user,
In order that I can instantly see the latest FT headlines,
I would like for the FT news feed to automatically load when I access the homepage.
```
```
As a user,
So that I can find out about a particular topic,
I would like to be able to search for and view headlines containing specific words.
```
## How to use this app
#### Live version
This app is deployed on Heroku. Visit https://ft-headline-searcher.herokuapp.com/ to see the live production version. Search for any term or phrase and the app will return a list of related FT headlines, 20 per page, in the form of links to the articles themselves (You will need to be an FT subscriber to read the articles).
#### Local
If you wish to set up the app locally, follow these steps:

1.) Clone this repo.

2.) Navigate to the root of the app. Then run `npm install` from the terminal to install dependencies.

3.) Create your own .env file in the root of the project, and in this file set your own valid FT API key like so:
```
FT_API_KEY=yourkeygoeshere
```
4.) To run the app locally run `node app.js` from the terminal and then go to `localhost:3000` in the browser.

5.) To run the tests for this app, run `npm test` from the terminal

## Todos and Issues
1.) There is only minimal styling and the website is not responsive. It can therefore be hard to read and navigate on smaller screens. I focussed chiefly on the back end of this application and somewhat neglected the front end and user experience. It is functional but no more than that and certainly needs to be improved.

2.) Due to a lack of experience with using nock and Zombie, I ended up with a fair amount of repeated code in my tests. The worst of which was the splitting of the pagination button tests into two separate files. These tests should definitely be in the same test file, and all the tests in general could be cleaned up a fair amount. However, I found mocking API calls using nock a fragile and tricky business and I would need a more solid understanding of nock before I can clean up my tests. The tests do all pass at least, and do not make real API calls. 
