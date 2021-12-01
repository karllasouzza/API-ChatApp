# REST API For Chat-App

This is a basic Node.js application backend that provides a REST
API.

## What do I need to run?

    Node.js in the version 16.x
    Yarn in the version 1.22.x

## Install Dependencies

    yarn

## Run the app

    yarn start
    Our
    yarn dev ( run the development mode )
 

# REST API

## Get All Users

### Request

`GET /users`

### Response Example

```json
    {
    "users": [
        {
        "ID": 1,
        "NAME": "Karlla Souzza",
        "EMAIL": "karlla@karlla.com",
        "PASSWORD": "Karlla1*"
        }
    ],
    "count": 1,
    "error": false
    }
    ...
```

## Create a New User

### Request

`POST /users`

### Response Example

```json
{
  "require": "karlla4@karlla.com",
  "error": false
}
```

## Get a specific User by ID

### Request

`GET /users/id`

### Response Example

```json
{
  "response": [
    {
      "ID": 1,
      "NAME": "Karlla Souzza",
      "EMAIL": "karlla@karlla.com",
      "PASSWORD": "Karlla1*"
    }
  ],
  "error": false
}
```

## Get a non-existent User required by ID

### Request

`GET /users/id`

### Response Example

```json
{
  "message": "The id require non exists",
  "error": true
}
```

## Get a specific User by Email

### Request

`GET /users/seach/email`

### Response Example

```json
{
  "users": [
    {
      "ID": 1,
      "NAME": "Karlla Souzza",
      "EMAIL": "karlla4@karlla.com",
      "PASSWORD": "Karlla1*"
    }
  ],
  "error": false
}
```

## Get a non-existent User required by Email

### Request

`GET /users/seach/email`

### Response Example

```json
{
"message": "The email require non exists",
"error": true
}
```
