const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axios = require('axios');
const bodyparser = require('body-parser');
const dbMethods = require('./DBHandelers/dbMethods.js');
const location = require('./LocReqHandler/location.js');

const jsonParser = bodyparser.json();

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
    
http.listen(8080, function () {
  console.log('Loc microservice active at 8080');
});
