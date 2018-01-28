axios = require('axios');
signup = require('../Requests/signup.js').signup;
login = require('../Requests/login.js').login;
logout = require('../Requests/logout.js').logout;
module.exports = {signup, login, logout};