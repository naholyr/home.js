var express = require('express');


// Load Swig template engine
var cons = require('consolidate');
var swig = require('swig');

// Init app
var app = express();

// Register Swig as template renderer
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname +'/templates');

// Swig requires some extra setup so that it knows where to look for includes and parent templates
swig.init({
    root: __dirname +'/templates/',
    allowErrors: true // allows errors to be thrown and caught by express instead of suppressed
});

app.get('/', function (req, res) {
    res.render('index.html', { foo: 'bar' });
});

app.listen(8000);