var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var axios = require('axios');

dataURL = 'https://data.crossfire37.hasura-app.io/v1/query';

//Header with admin auth token
dbAuthHeader = {
  headers : {
      Authorization : 'Bearer '+process.env.DB_PASSWORD
  }
};
const findDriver = (pos) => {
  dataQuery = {
    "type": "select",
    "args": {
      "table": "Location",
      "columns": [
        "hasura_id"
      ],
      "where": {
        "hasura_id": {
          "$eq": pos.hasuraId
        }
      }
    }
  }
  axios.post(dataURL, dataQuery, dbAuthHeader)
  .then((response) => {
    if(response.hasura_id){
      console.log("----Driver Exist------");
      return true;
    }
  })
  .catch((error) => {
    console.log("Error while finding driver");
    // console.log(error);
    return true;
  });
}
const driverLocCreate = (pos) => {
  if(findDriver(pos)){
    return;
  }
  dataQuery = {
    "type": "insert",
    "args": {
      "table": "Location",
      "objects": [
        {
          "hasura_id": pos.hasuraId,
          "latitude": pos.latitude,
          "longitude": pos.longitude,
          "last_update": pos.timestamp
        }
      ]
    }
  }
  axios.post(dataURL , dataQuery, dbAuthHeader)
  .then((dataResponse) => {
    console.log(dataResponse);
  })
  .catch((error) => {
  if(error.response){
    console.log("Error while creating new DB entry");
    console.log(error.response.data);
  }
  });
}

const driverLocUpdate = (pos) => {
  dataQuery = {
  "type": "update",
  "args": {
    "table": "Location",
    "where": {
      "hasura_id": {
        "$eq": pos.hasura_id
      }
    },
    "$set": {
      "latitude": pos.latitude,
      "longitude": pos.longitude,
      "last_update": pos.timestamp
      }
    }
  }

  axios.post(dataURL , dataQuery, dbAuthHeader)
  .then((dataResponse) => {
    console.log(dataResponse);
  })
  .catch((error) => {
  if(error.response){
    console.log("Error while updating DB entry");
    // console.log(error.response.data);
  }
  });
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a driver connected');
  console.log(socket.handshake.query);
  driverLocCreate(socket.handshake.query);

  socket.on('disconnect', function(){
    console.log('driver disconnected');
  });

  socket.on('position', function(pos){
    console.log(pos);
    driverLocUpdate(pos);
  });

    socket.on('Hasura Id', function(obj){
      console.log(obj);
    });
  });
    
http.listen(8080, function () {
  console.log('Loc microservice active at 8080');
});
