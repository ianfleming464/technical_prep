const http = require('http'), //import required modules
  url = require('url'),
  fs = require('fs');

http // create server using the http module
  .createServer((request, response) => {
    let addr = request.url,
      q = url.parse(addr, true), //parsing the request URL
      filePath = '';

    // logging each request made to server. appendFile()takes 3 arguments: the file name to append to, the info to be appended,
    // and an error handling function
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Added to log.');
      }
    });

    // if the URL contains 'documentation', directs user to documentation - otherwise back to homepage (index)
    if (q.pathname.includes('documentation')) {
      filePath = __dirname + '/documentation.html';
    } else {
      filePath = 'index.html';
    }
    // grabs the appropriate file from the server
    fs.readFile(filePath, (error, data) => {
      if (error) {
        throw error;
      }

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });
  })
  .listen(8080);

console.log('Node test server running on port 8080');
