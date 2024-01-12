/*
  Incredibly simple Node.js and Express application server for serving static assets.

  DON'T USE THIS IN PRODUCTION!
    It is meant for learning purposes only. This server is not optimized for performance,
    and is missing key features such as error pages, compression, and caching.

  For production, I recommend using an application framework that supports server-side rendering,
    such as Next.js. https://nextjs.org
  Or, if you do indeed want a Single Page App, the Create React App deployment docs contain a lot
    of hosting options. https://create-react-app.dev/docs/deployment/
*/

const express = require('express');
const pathUtils = require('path');
const PORT = process.env.PORT || 8080;
const app = express();
const appDir = pathUtils.resolve( __dirname, "dist" );


// serve static assets normally
app.use(express.static(appDir));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
    response.sendFile(path.resolve(appDir, 'index.html'));
});

app.listen(PORT);
console.log( "Express server listening on port " + PORT );
console.log( "http://localhost:" + PORT );