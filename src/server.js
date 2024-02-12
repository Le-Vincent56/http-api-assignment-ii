// Imports
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
const jsonHandler = require('./jsonResponses.js');

// Establish port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  "GET": {
    '/': htmlHandler.getIndexPage,
    '/style.css': cssHandler.getIndexStyle,
    '/getUsers': jsonHandler.getUsers,
    '/notReal': jsonHandler.notFound,
    notFound: jsonHandler.notFound

  },
  "HEAD": {
    '/getUsers': jsonHandler.getUsersMeta,
    '/notReal': jsonHandler.notFoundMeta,
    notFound: jsonHandler.notFoundMeta
  },
  "POST": {
    '/addUser': jsonHandler.updateUser
  },
};

// Server functions
const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);

  // Check if the URL struct contains the request method
  if(!urlStruct[request.method])
  {
    // If not, return the HEAD's not found response
    return urlStruct.HEAD.notFound(request, response);
  }

  // Check if the pathname exists within the URL struct's 
  // request method object
  if(urlStruct[request.method][parsedURL.pathname])
  {
    // Return the path's response
    return urlStruct[request.method][parsedURL.pathname](request, response);
  }

  // Return not found it no method is found
  return urlStruct[request.method].notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
