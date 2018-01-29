const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const axios = require('axios');
const auth = require('./Controllers/auth_controllers.js');

const jsonParser = bodyparser.json();

//your routes here
app.get('/', function (req, res) {
  res.send("Hello World!");
});

//User/Driver signup route
app.post('/signup', jsonParser, auth.signup);

//User/Driver login route
app.post('/login', jsonParser , auth.login);

//User/Driver logout
app.post('/logout', jsonParser , auth.logout);

app.post('/getcab', jsonParser, )

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
