const express = require("express");
var app = express();

const bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);
app.set('layout', 'layout/layout.ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const db = require("./helpers/db")();

// Routes
const indexRoute = require('./routes/index');
app.use('/', indexRoute);

const personRoute = require('./routes/person');
app.use('/person', personRoute);

const errorController = require('./controllers/errors');
app.use(errorController.get404Page);



app.listen(3000, () => {
    console.log("App Started On Port : 3000");
});