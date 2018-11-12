const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express()
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs ');

app.use((req, res, next) =>{
  let now = new Date().toString(); 
  let log = `${now}: ${req.method} ${req.originalUrl}`;

  fs.appendFile( 'server.log', log +'\n', (err) => {
    if(err){
      console.log('Unable to add data to the server.log!!!');
    };

  });
  console.log();
  next();
});;

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance',
//     content: 'Back on 24hr.'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle:'Home page',
    content: 'Some content'
  });
});

app.get('/about', (req, res) => {
  
  res.render('about.hbs', {
    pageTitle:'About page',
    content: 'Some content'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: ' Unable to connect to server'
  })
});

app.listen(port, () => console.log(`Server running on port ${port}!h.`))