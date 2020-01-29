var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {            
    res.send('Hello World!');
})

app.post('/ping', function(req, res) {
    res.send(req.body);    
})

app.set('port', 3000);

var server = app.listen(app.get('port'), function () {
    if (process.env.DYNO) {
        console.log('Running on Heroku...');
        fs.openSync('/tmp/app-initialized', 'w');
      }
    console.log('Node app is running on port:', app.get('port'));
});
