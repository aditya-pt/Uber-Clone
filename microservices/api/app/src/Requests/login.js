loginURL = 'https://auth.crossfire37.hasura-app.io/v1/login'

//Default request header
authHeader = {
  "headers" : {   
    "Content-Type" : "application/json"
  }
};

const login = (req,res) => {
  axios.post(loginURL, req.body, authHeader)
      .then((response) => {
        console.log(response.data);
        res.cookie('auth_token', response.data.auth_token).status(response.status).send(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          res.status(error.response.status).send(error.response.data);
        } 
  });
};

module.exports = {login};