var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
require('dotenv').config();
require('./app/routes.js')(app);
// configuration =================

mongoose.connect('mongodb://' + process.env.USERPASS + '@jello.modulusmongo.net:27017/Imomoh3u'); // connect to mongoDB database on modulus.io
// Add headers

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});


// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
