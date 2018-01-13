const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const axios = require('axios');

const jsonParser = bodyparser.json();

//your routes here
app.get('/', function (req, res) {
  res.send("Hello World!");
});

app.post('/signup', jsonParser , function (req, res){
  console.log(req.body);
  axios.post('http://auth.crossfire37-hasura:80', req.body)
        .then((response) => {
          console.log(response);
          res.send(response);
        })
        .catch((err) => {
          console.log(err);
        });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
