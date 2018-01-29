# API endpoint

This microservice handles the initial signup, login, logout and database entries for the users and drivers.

### Route /signup

For Driver Signup
```json
{
  "user": {
    "provider": "username",
    "data": {
      "username": "ron",
      "password": "12345678"
    }
  },
  "role": "driver",
  "firstname": "Ron",
  "lastname": "Smith",
  "regno": "DL06H1010",
  "type": "Sedan",
  "capacity": "4",
  "city": "Delhi"
}
```

For User Signup
```json
{
  "user": {
    "provider": "username",
    "data": {
      "username": "ron",
      "password": "12345678"
    }
  },
  "role": "user",
  "firstname": "Ron",
  "lastname": "Smith",
}
```
### Route /login
```json
{
  "provider": "username",
  "data": {
    "username": "rohan5421",
    "password": "js@hasura"
  }
}
```

### Route /logout
```json
{
    "auth_token": "<user/driver authentication token>",
}
```
