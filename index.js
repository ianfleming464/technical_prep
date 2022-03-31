const res = require('express/lib/response');

const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  app = express();
const router = express.Router({ caseSensitive: false });

let movies = [
  {
    title: 'Airplane!',
    description:
      'A man afraid to fly must ensure that a plane lands safely after the pilots become sick.',
    image: 'https://image.tmdb.org/t/p/original/zOiB3p2WTTiwCFgTMnXuDGgzbTN.jpg',
    year: '1980',
  },
  {
    title: 'Predator',
    description:
      'A team of commandos on a mission in a Central American jungle find themselves hunted by an extraterrestrial warrior.',
    image: 'https://image.tmdb.org/t/p/original/yGIhtlL2sxFYGrozmEPvYicsDT7.jpg',
    year: '1987',
  },
  {
    title: 'Blade Runner',
    description:
      'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
    image: 'https://image.tmdb.org/t/p/original/yGIhtlL2sxFYGrozmEPvYicsDT7.jpg',
    year: '1982',
  },
  {
    title: 'Aliens',
    description:
      'Ellen Ripley is rescued by a deep salvage team after being in hypersleep for 57 years. The moon that the Nostromo visited has been colonized, but contact is lost. This time, colonial marines have impressive firepower, but will that be enough?',
    image: 'https://image.tmdb.org/t/p/original/xwdPTZyyBa4U3V2N0EmozTCeEAY.jpg',
    year: '1986',
  },
  {
    title: 'The Terminator',
    description:
      "In 1984, a human soldier is tasked to stop an indestructible cyborg killing machine, both sent from 2029, from executing a young woman, whose unborn son is the key to humanity's future salvation.",
    image: 'https://image.tmdb.org/t/p/original/qvktm0BHcnmDpul4Hz01GIazWPr.jpg',
    year: '1984',
  },
  {
    title: 'The Breakfast Club',
    description:
      'Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.',
    image: 'https://image.tmdb.org/t/p/original/c0bdxKVRevkw50LOnk6B8d3e4s.jpg',
    year: '1985',
  },
  {
    title: 'The Princess Bride',
    description:
      "While home sick in bed, a young boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.",
    image: 'https://image.tmdb.org/t/p/original/dvjqlp2sAhUeFjUOfQDgqwpphHj.jpg',
    year: '1987',
  },
  {
    title: 'Back to the Future',
    description:
      'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.',
    image: 'https://image.tmdb.org/t/p/original/7lyBcpYB0Qt8gYhXYaEZUNlNQAv.jpg',
    year: '1985',
  },
  {
    title: 'Beverly Hills Cop',
    description:
      'A freewheeling Detroit cop pursuing a murder investigation finds himself dealing with the very different culture of Beverly Hills.',
    image: 'https://image.tmdb.org/t/p/original/2O0KSDef3gRuoOswd9HCv0HSfXL.jpg',
    year: '1984',
  },
  {
    title: 'Twins',
    description:
      'A physically perfect but innocent man goes in search of his long-lost twin brother, who is short, a womanizer, and small-time crook.',
    image: 'https://image.tmdb.org/t/p/original/stJx9BQZbXrZnTGf9Erc7d2UMVc.jpg',
    year: '1988',
  },
];

app.use(morgan('common')); // Logging with Morgan
app.use(bodyParser.json()); // Using bodyParser
app.use('/documentation', express.static('public')); // public folder for documentation
app.use((error, request, response, next) => {
  //error handling
  console.error(error.stack);
  response.status(500).send('Something broke!');
});

// GET requests, which all take the following format:
// app.METHOD(PATH, HANDLER)

// Main page
app.get('/', (request, response) => {
  response.send('Root Route');
});

// Get and display the movies from the above movie variable
app.get('/movies', (request, response) => {
  response.send(movies);
});

// by title
app.get('/movies/:title', (request, response) => {
  let movie = movies.find((movie) => movie.title === request.params.title);
  if (!movie) response.status(404).send('Movie does not exist in database');
  response.send(movie);
});

// returns a file
app.get('/documentation', (request, response) => {
  response.sendFile('public/documentation.html', { root: __dirname });
});

app.listen(8080, () => console.log('Your app is listening on port 8080'));
