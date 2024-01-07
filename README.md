# Welcome to Milieux

By Nicolas Tournier Copyright 2024

This is purely a proof of concept.

The goal is to add colored dots to a world map. These dots are added when a user shares a comment about their current environment or “milieu”.
The app uses sentiment analysis to determine the emotional tone of the comment, which is then represented by a score. The color of the dot at the user’s location on the map corresponds to this emotional tone.
So, in essence, the app seeks to visually map people’s feelings about their environments on a global scale. 😊

Roll over, drill down and back up, and explore the world of feeling. You can even choose a timeframe!

I hope it is interesting.

The app takes no personal data and authenticates anonymously.
The location of the user will be store in a Google cloud database for use with this app and won't be used for any other purpose.
Location will need to be enabled on the user's browser for this app to function correctly.

### View a running version here:

https://milieux-b9d27.web.app


### Tech Stack:

React
DeckGl
Firebase
Vader Sentiment Analysis
GIT

### Run locally:

npm install
firebase emulators:start
npm run start

Please note that there is a small bug wherein the visible datapoints will not appear until a somewhat positive comment is added.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Note that there are not currently any tests for this project.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
