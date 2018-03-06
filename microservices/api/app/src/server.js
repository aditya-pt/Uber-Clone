const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const axios = require('axios');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const auth = require('./Controllers/auth_controllers.js');
const dbMethods = require('./DBHandelers/dbMethods.js');
const location = require('./LocReqHandler/location.js');


const jsonParser = bodyparser.json();

//your routes here
// app.get('/', function (req, res) {
//   res.send("Hello World!");
// });

//User/Driver signup route
app.post('/signup', jsonParser, auth.signup);

//User/Driver login route
app.post('/login', jsonParser , auth.login);

//User/Driver logout
app.post('/logout', jsonParser , auth.logout);

// app.post('/getcab', jsonParser, )
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/getCabList', jsonParser, location.getDistance);

io.on('connection', function(socket){
  console.log('a driver connected');
  console.log(socket.handshake.query);
  dbMethods.findDriver(socket.handshake.query);

  socket.on('disconnect', function(){
    console.log('driver disconnected');
  });

  socket.on('position', function(pos){
    console.log(pos);
    dbMethods.driverLocUpdate(pos);
  });
});
    
http.listen(3000, function () {
  console.log('Backend microservice active at 3000');
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
