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
  console.log(req.headers);
  axios.post('http://auth.crossfire37-hasura/v1/signup', req.body, {headers : req.headers})
        .then((response) => {
          console.log(response);
          res.status(response.status).send(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            res.status(error.response.status).send(error.response.data);
          } 
        });
})

app.post('/login', jsonParser , function (req, res){
  console.log(req.body);
  axios.post('http://auth.crossfire37-hasura/v1/login', req.body, {headers : req.headers})
        .then((response) => {
          console.log(response);
          res.status(response.status).send(response.data);
        })
        .catch((error) => {
          // console.log(err.response);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.status(error.response.status).send(error.response.data);
          } 
        });
})

app.post('/logout', jsonParser , function (req, res){
  console.log(req.body);
  axios.get('https://auth.crossfire37.hasura-app.io/v1/logout', {headers : req.headers})
        .then((response) => {
          console.log(response);
          res.status(response.status).send(response.data);
        })
        .catch((error) => {
          // console.log(err.response);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.status(error.response.status).send(error.response.data);
          } 
        });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
