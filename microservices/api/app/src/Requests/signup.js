signupURL = 'https://auth.crossfire37.hasura-app.io/v1/signup';
dataURL = 'https://data.crossfire37.hasura-app.io/v1/query';
assignRoleURL = 'https://auth.crossfire37.hasura-app.io/v1/admin/user/add-role';

//Header with admin auth token
dbAuthHeader = {
  headers : {
      Authorization : 'Bearer '+process.env.DB_PASSWORD
  }
};

//Default header
authHeader = {
  "headers" : {   
    "Content-Type" : "application/json"
  }
};
//Create new entry for driver in the Drivers table
const driverTableEntry = (dataQuery, res, response) => {
  axios.post(dataURL , dataQuery, dbAuthHeader)
  .then((dataResponse) => {
    roleBody = {
      "hasura_id": response.data.hasura_id,
      "role": "driver"
    };
    //Assign role to the driver
    axios.post(assignRoleURL, roleBody, dbAuthHeader)
        .then((roleResponse) => {
          console.log(roleResponse);
          response.data.hasura_roles.push("driver");
          res.status(response.status).send(response.data);
        })
        .catch((error) => {
          if(error.response){
            console.log(error.response.data);
            res.status(error.response.status).send(error.response.data);
          }
        });
  
  })
  .catch((error) => {
  if(error.response){
    console.log(error.response.data);
    res.status(error.response.status).send(error.response.data);
  }
  });
};

//Populate dataQuery with request data and hausra_id
const createDriver = (req, res, response) => {
  dataQuery = {
    "type": "insert",
    "args": {
      "table": "Drivers",
      "objects": [
        {
            "Hasura_Id": response.data.hasura_id,
            "First_Name": req.body.firstname,
            "Last_Name": req.body.lastname,
            "Vehicle_Reg_No": req.body.regno,
            "Vehicle_Type": req.body.type,
            "Vehicle_Capacity": req.body.capacity,
            "City": req.body.city,
            "Success_Rides" : 0,
            "Kilometers_Driven" : 0,
            "User_Rating" : 0
        }
      ]
    }
  };
  driverTableEntry(dataQuery, res, response);
}

//Create new entry for driver in the Drivers table
const userTableEntry = (dataQuery, res, response) => {
  axios.post(dataURL , dataQuery, dbAuthHeader)
  .then((dataResponse) => {
  res.status(response.status).send(response.data);
  })
  .catch((error) => {
  if(error.response){
    console.log(error.response.data);
    res.status(error.response.status).send(error.response.data);
  }
  });
}

//Populate dataQuery with request data and hausra_id
const createUser = (req, res, response) => {
  dataQuery = {
      "type": "insert",
      "args": {
          "table": "Users",
          "objects": [
              {
                  "hasura_id": response.data.hasura_id,
                  "First_Name": req.body.firstname,
                  "Last_Name": req.body.lastname
              }
          ]
      }
  };
  userTableEntry(dataQuery, res, response);
}

//Signup route handeler function
function signup(req, res){
  console.log(req.body);
  if(req.body.role == 'user' || req.body.role == 'driver'){
    axios.post(signupURL, req.body.user, authHeader)
    .then((response) => {
      console.log(response.header);
      if(req.body.role == 'driver'){
        createDriver(req, res, response);
      }
      else if(req.body.role == 'user'){
        createUser(req, res, response);
      }
    })
    .catch((error) => {
      if (error.response) {
          res.status(error.response.status).send(error.response.data);
      } 
    });
  }
  else{
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"body" : "User role not valid"}));
  }
};

 module.exports = {signup};