# FT-Headline-Searcher
This application allows users to search for and view headlines from the Financial Times. It was built in a test driven manner using the testing framework Mocha in conjunction with the assertion library Chai, and uses Zombie as a headless browser.   

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
This app is deployed on Heroku. Visit https://ft-headline-searcher.herokuapp.com/ to see the live production version.
#### Local
If you wish to set up the app locally follow these steps:

1.) Clone this repo.

2.) Navigate to the root of the app. Then run `npm install` from the terminal to install dependencies.

3.) Create your own .env file in the root of the project, and in this file set your own valid FT API key like so:
```
FT_API_KEY=yourapikeygoeshere
```
4.) To run the app locally run `node app.js` from the terminal.

5.) To run the tests for this app, run `npm test` from the terminal
