const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');
// methodOverride = require('method-override');

const app = express();

app.use(morgan('common'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());
// app.use(methodOverride());
app.use('/documentation', express.static('public'));
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send('Something broke!');
});

// GET requests, which all take the following format:
// app.METHOD(PATH, HANDLER)
// Main page
app.get('/', (request, response) => {
  response.send('default textual response of my choosing');
});
// returns a file
app.get('/documentation', (request, response) => {
  response.sendFile('public/documentation.html', { root: __dirname });
});
// returns JSON variable
app.get('/books', (request, response) => {
  response.json(topBooks);
});

app.listen(8080, () => console.log('Your app is listening on port 8080'));
