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
Response on successful signup
```javascript
{
    "auth_token": "<user/driver auth token>",
    "username": "ron",
    "hasura_id": 1,
    "hasura_roles": [
        "user",
        "driver" //This role is added only to the drivers
    ]
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
Response on succesful login
```javascript
{
    "auth_token": "<user/driver auth token>",
    "username": "ron",
    "hasura_id": 1,
    "hasura_roles": [
        "user",
        "driver" //This role is added only to the drivers
    ]
}
```

### Route /logout
```json
{
    "auth_token": "<user/driver authentication token>",
}
```
Response on successful logout
```json
{
    "message": "logged out"
}
```
