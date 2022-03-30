const express = require('express');
const app = express();

let topBooks = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien',
  },
  {
    title: 'Twilight',
    author: 'Stephanie Meyer',
  },
];

// GET requests, which all take the following format:
// app.METHOD(PATH, HANDLER)
// Main page
app.get('/', (request, response) => {
  response.send('Welcome to my book club!');
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
