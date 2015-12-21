 var http = require('http');
 var fs = require('fs'); 

 // 404 response 
 function send404Response(response) {
 	response.writeHead(404, { "Context-Type": "text/plain"});
 	response.write('Error 404: Page not Found!');
 	response.end();
 }

//handle user request
 function onRequest(request, response) {
 	console.log('request',request.url);
  //`request` is anything data that the user has requested
  if( request.method == 'GET' && request.url == '/') {
  // `forward slash (/)` is requesting for the HOME PAGE
  // if you want to send a html file instead of text/plain, use text/html 
  	response.writeHead(200, { "Context-Type" : "text/html"});

  	//`pipe()` is something to write out to the response object;
  	fs.createReadStream('./index.html').pipe(response); 
  	console.log(request.url);
  } else {
  	send404Response(response);
  }
 };
 // http.createServer requires a `request` parameter; 
 http.createServer(onRequest).listen(4000);
 console.log('Server is now running....'); 


