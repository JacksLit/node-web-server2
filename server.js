const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 5000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req,res,next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/',(req, res) => {
  res.render('home.hbs', {
    siteTitle: 'Josh Zirena',
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my first nodeJS powered by Express utilizing hbs!'
  })
});

app.get('/about',(req,res) =>{
  res.render('about.hbs', {
    siteTitle: 'About - Zirena',
    pageTitle: 'About Page'
  });
});

app.get('/projects',(req,res) =>{
  res.render('projects.hbs', {
    siteTitle: 'Projects - Zirena',
    pageTitle: 'Projects'
  });
});

/*
app.get('/maintenance',(req,res) =>{
  res.render('maintenance.hbs', {
    siteTitle: 'Maintenance'
  });
});
*/

// /bad - send back JSON with errorMessage

app.get('/bad',(req,res) => {
  res.send({
    StatusCode: '404',
    errorMessage: 'Could not locate file.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
