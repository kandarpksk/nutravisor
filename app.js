
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var welcome = require('./routes/welcome'); // first-run screen
var login = require('./routes/login');
var index = require('./routes/index'); // main screen
var suggest = require('./routes/suggest'); // alternative main screen
var settings = require('./routes/settings'); // toggle options
var history = require('./routes/history'); // past meals
var menu = require('./routes/menu'); // full screen (for now)
var onboarding = require('./routes/onboarding');
var data = require('./routes/data');
var signup = require('./routes/signup');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('random~s3cure~k3y-h8rE'));
app.use(express.cookieSession());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/welcome', welcome.view);
app.get('/onboarding', onboarding.view);
app.get('/login', login.view);
app.get('/signup', signup.view);
app.get('/', index.view);
app.get('/home', index.viewAlt);
app.get('/suggest', suggest.view);
app.get('/settings', settings.view);
app.get('/history', history.view);
app.get('/menu', menu.view);
app.get('/data/nutrition/:dish/:servings', data.detail);
app.get('/data/logout', data.logout);
app.get('/data/noreminder', data.noreminder);
app.get('/data/remove/:time/:mm/:dd/:yyyy', data.remove);
app.get('/data/dishes/:restaurant', data.random);
app.get('/data/dishes/:restaurant/:nutrient', data.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
