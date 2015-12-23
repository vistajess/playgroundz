 var http = require('http');

 function onRequest(request, response) {
  console.log('User made a request' + request.url);
// `writeHead` takes 3 parameters: `statusCode`,`reason`,`obj`
  response.writeHead(200, {"Context-Type" : "text/plain"});
  response.write('Here is some data');
  response.end();  
 };
 // http.createServer requires a `request` parameter; 
 http.createServer(onRequest).listen(8888);
 console.log('Server is now running....'); 


