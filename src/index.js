// import npm library
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars'); 

// import module
const db = require('./config/db');
const route = require('./routes');

// variable decalaration
const app = express();
const port = 2008;

// expess configure
app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());

// setup route
route(app);

// connect to db
db.connect();

// open webserver
app.listen(port, () => {
    console.clear();
    console.log(`Open app success at http://localhost:${port}`);
})