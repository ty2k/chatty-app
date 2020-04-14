# chatty-app

**chatty-app** is a single-page app to allow multiple users to chat in one window. It is built using React, and it uses my related WebSockets server [chatty-server](https://github.com/ty2k/chatty-server).

Built on top of [Lighthouse Lab's React Simple Boilerplate](https://github.com/lighthouse-labs/react-simple-boilerplate).

## Install

Clone this repository and `npm install`.

## Run

`npm run start`, then open http://localhost:3000 in your browser.

Note that server-dependent functions will not work without [chatty-server](https://github.com/ty2k/chatty-server) running.

## Linting

`npm run lint` to run ESLint rules against the project files.

## Notes

By default, [chatty-server](https://github.com/ty2k/chatty-server) uses port 3001 while chatty-app client uses port 3000.

## Screenshot

![Screenshot of Chatty App's index view](https://raw.githubusercontent.com/ty2k/chatty-app/master/docs/Screenshot-Chatty-App-index.png)

## Dependencies

* [React](https://www.npmjs.com/package/react)
* [Webpack](https://www.npmjs.com/package/webpack)
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

## Contact the Author

[Tyler Krys](https://tylerkrys.ca) made this.
