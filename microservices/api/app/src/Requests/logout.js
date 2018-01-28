logoutURL = 'https://auth.crossfire37.hasura-app.io/v1/user/logout';

//Logout route handeler
const logout = (req, res) => {
  console.log(req.body);
  //Auth header with user auth token
  authHeader = {
    "headers" : {   
      "Content-Type" : "application/json",
      "Authorization" : 'Bearer '+req.body.auth_token
    }
  };
  axios.post(logoutURL, req.body, authHeader)
  .then((response) => {
    res.status(response.status).send(response.data);
  })
  .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).send(error.response.data);
    } 
  });
}

module.exports = {logout};