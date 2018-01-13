const express = require('express');
const app = express();
const axios = require('axios');ha

//your routes here
app.get('/', function (req, res) {
  res.send("Hello World!");
});

app.get('/signup', function (req, res){
  console.log(req);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
