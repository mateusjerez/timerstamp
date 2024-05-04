// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api', function(req, res){
  req.time = Date().toString();
  var date1 = new Date(req.time);

  res.json({"unix":date1.valueOf(), "utc": date1.toUTCString()});
})

app.get('/api/:time', function(req, res){
  var str = req.params.time;
  
  if(isNaN(str)){
    var date = new Date(str);    
  }else{
    var date = new Date(str*1);
  }

  if(date.toUTCString() == "Invalid Date"){
    res.json({"error":date.toUTCString()})
  }else {
    res.json({"unix":date.valueOf(), "utc": date.toUTCString()});
  }
  
});
