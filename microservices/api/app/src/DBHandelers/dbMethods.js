const axios = require('axios');

const dataURL = 'https://data.crossfire37.hasura-app.io/v1/query';

const dbAuthHeader = {
  headers : {
      Authorization : 'Bearer '+process.env.DB_PASSWORD
  }
};
const findDriver = (pos) => {
  dataQuery = {
    "type": "select",
    "args": {
      "table": "location",
      "columns": [
        "hasura_id",
        "last_update"
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
    if(response.data[0] != undefined && response.data[0].hasura_id == pos.hasuraId){
      if(pos.timestamp == response.data[0].last_update){
        console.log("----Driver Exist------");
      }
      else{
        driverLocUpdate(pos);
      }
    }
    else{
      driverLocCreate(pos);
    }
  })
  .catch((error) => {
    console.log("Error while finding driver");
    console.log(error.response.data);
  });
}
const driverLocCreate = (pos) => {
  dataQuery = {
    "type": "insert",
    "args": {
      "table": "location",
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
    console.log('Created new driver entry for ' + pos.hasuraId);
    // console.log(dataResponse);
  })
  .catch((error) => {
  if(error.response){
    console.log("Error while creating new DB entry");
    // console.log(error.response.data);
  }
  });
};

const driverLocUpdate = (pos) => {
  dataQuery = {
  "type": "update",
  "args": {
    "table": "location",
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
    console.log('Updated driver entry for ' + pos.hasura_id);
    // console.log(dataResponse);
  })
  .catch((error) => {
  if(error.response){
    console.log("Error while updating DB entry");
    // console.log(error.response.data);
  }
  });
};

module.exports = {findDriver, driverLocUpdate};