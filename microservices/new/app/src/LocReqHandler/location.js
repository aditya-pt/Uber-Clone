const axios = require('axios');
const dataURL = 'https://data.crossfire37.hasura-app.io/v1/query';

const dbAuthHeader = {
  headers : {
      Authorization : 'Bearer '+process.env.DB_PASSWORD
  }
};

const getDistance = (req, res) => {
  console.log(req.body);
  query = "SELECT hasura_id FROM location WHERE gc_dist(latitude, longitude, "
          + req.body.latitude +","+ req.body.longitude +") > 10;"
  dataBody = {
    "type": "run_sql",
    "args": {
      "sql": query
    }
  };
  console.log(dataBody); 
  axios.post(dataURL, dataBody, dbAuthHeader)
  .then((dataResponse) => {
    res.send(dataResponse.data);
  })
  .catch((error) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"body" : "Error in getting driver locations"}));
    console.log(error.message);
  })
};

module.exports = {getDistance};