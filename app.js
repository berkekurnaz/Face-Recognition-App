const express = require("express");
var app = express();

const bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const db = require("./helpers/db")();

// Routes
const indexRoute = require('./routes/index');
app.use('/', indexRoute);

const errorController = require('./controllers/errors');
app.use(errorController.get404Page);



app.listen(3000, () => {
    console.log("App Started On Port : 3000");
});