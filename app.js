var express = require('express');
var feedparser = require('feedparser');
var async = require('async');

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
	function displayTitle (article) {
	  var arttitle = JSON.stringify(article.title)
	  console.log('Got title: %s', arttitle);
	}
	async.parallel ([
		function() { feedparser.parseUrl('http://archives.steinmetz.fr/journal/feeds/all.atom.xml').on('article', displayTitle) },
		function() { feedparser.parseUrl('http://nsteinmetz.tumblr.com/rss').on('article', displayTitle) },
		function() { feedparser.parseUrl('http://archives.steinmetz.fr/tutoriels/feeds/all.atom.xml').on('article', displayTitle) },
		function() { feedparser.parseUrl('http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=nsteinmetz').on('article', displayTitle)  },
	], function(err, results) {
		res.render('index', {
                  foo: 'bar',
                  feeds: [] // TODO calculate from results
                });
	});
});

app.listen(8000);