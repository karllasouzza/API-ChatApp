# REST API For Chat-App

This is a basic Node.js application backend that provides a REST
API.

## What do I need to run?

    Node.js in the version 16.x
    Yarn in the version 1.22.x
    Mysql in the last version

## Install Dependencies

    yarn

## Configure the environment variable

rename the file 'nodemon.example.json' to 'nodemon.json' soon after setting it up with your local mysql connection.

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
    "response": [
            {
                "_id": "43ab0e1e-58b7-4348-ad0b-e14010daddd5",
                "name": "Karlla Souzza",
                "email": "karlla@karlla.com",
                "password": "38795f946d1f3386ec68ad1b3af66768f4e0edd07446433c10ca9536bce77cd2",
                "thumbnail": null,
                "bio": null
            },
         ...
    ],
    "count": 1,
    "error": false
    }
```

## Create a New User

### Request

`POST /users`

### Request Body Example

```json
{
  "name": "Karlla Souzza",
  "email": "karlla@karlla.com",
  "password": "Karlla1*"
}
```

### Response Example

```json
{
  "id": "43ab0e1e-58b7-4348-ad0b-e14010daddd5",
  "error": false
}
```

## Get a specific User by ID

### Request

`GET /users/:id`

### Request Example

`GET /users/43ab0e1e-58b7-4348-ad0b-e14010daddd5`

### Response Example

```json
{
  "response": [
    {
      "name": "Karlla Souzza",
      "email": "karlla@karlla.com",
      "thumbnail": null
    }
  ],
  "error": false
}
```

## Get a non-existent User required by ID

### Request

`GET /users/:id`

### Response Example

```json
{
  "message": "The id require non exists",
  "error": true
}
```

## Get a specific User by Email

### Request

`GET /users/seach/:email`

### Request Example

`GET /users/seach/karlla@karlla.com`

### Response Example

```json
{
  "response": [
    {
      "name": "karlla Souzza",
      "email": "karlla@karlla.com"
    }
  ],
  "error": false
}
```

## Get a non-existent User required by Email

### Request

`GET /users/seach/:email`

### Response Example

```json
{
  "message": "The email require non exists",
  "error": true
}
```

## Make the login

### Request

`POST /login`

### Body Example

```json
{
  "email": "karlla@karlla.com",
  "password": "Karlla1*"
}
```

### Response Example

```json
{
  "_id": "43ab0e1e-58b7-4348-ad0b-e14010daddd5",
  "error": false
}
```

## Get a non-existent account required by email and password

### Request

`GET /users/login`

### Response Example

```json
{
  "message": "Error logging in",
  "error": true
}
```

## Upload profile thumbnail

### Request

`POST /users/upload`

### body Example

```json
{
  "upload": foto_perfil.png,
  "id": "43ab0e1e-58b7-4348-ad0b-e14010daddd5"
}
```

### Response Example

```json
{
  "response": "Image loaded successfully",
  "error": false
}
```

## Get profile thumbnail By ID

### Request

`GET /users/:id/img`

### Request Example

`GET /users/43ab0e1e-58b7-4348-ad0b-e14010daddd5/img`

### Response Example

`Rendered image`

## Update user By ID

### Request

`PATCH /users/:id`

### Request Example

`GET /users/43ab0e1e-58b7-4348-ad0b-e14010daddd5`

### Response Example

`Rendered image`

## DELETE a specific User (And all your data) by ID

### Request

`DELETE /users/:id`

### Response Example

```json
{
  "response": "User deleted successfully",
  "error": false
}
```

## Delete a non-existent User required by Email

### Request

`DELETE /users/:id`

### Response Example

```json
{
  "message": "The id require non exists",
  "error": true
}
```

## Get all Chats by userID

`GET /chats/:id`

### Request Example

`/chats/43ab0e1e-58b7-4348-ad0b-e14010daddd`

### Response Example

```json
{
    "response": [
        {
            "_id": "4b5a9a3f-4d8d-4ac3-8472-8a071b378d89",
            "status": "Pending",
            "user_to": "a9c87413-4cb2-4810-be9f-38566059ba31",
            "user_from": "ebf01b1f-e56e-4c42-969d-17a07bfd1e25"
        },
        ...
    ],
    "count": 1,
    "error": false
}
```

## Get Chats Pending By ID

`GET /chats/requests/:id`

### Request Example

`/chats/requests/43ab0e1e-58b7-4348-ad0b-e14010daddd`

### Response Example

```json
{
  "response": [
    {
      "_id": "4b5a9a3f-4d8d-4ac3-8472-8a071b378d89",
      "status": "Pending",
      "user_to": "a9c87413-4cb2-4810-be9f-38566059ba31",
      "user_from": "ebf01b1f-e56e-4c42-969d-17a07bfd1e25"
    }
  ],
  "count": 1,
  "error": false
}
```

## Post Chats Pending By ID

`POST /chats/pending`

### Body Example

```json
{
  "userFrom": "ebf01b1f-e56e-4c42-969d-17a07bfd1e25",
  "userTo": "a9c87413-4cb2-4810-be9f-38566059ba31"
}
```

### Response Example

```json
{
  "id": "ebc92217-c05e-4c3a-9d27-af9ee44f13d3",
  "error": false
}
```

## Update Chats To Accepted By ID

`PATCH /chats/accepted`

### Body Example

```json
{
  "id": "ebc92217-c05e-4c3a-9d27-af9ee44f13d3"
}
```

### Response Example

```json
{
  "response": "Chat Status Changed To Accepted",
  "error": false
}
```

## Update Chats Denied By ID

`PATCH /chats/denied`

### Body Example

```json
{
  "id": "ebc92217-c05e-4c3a-9d27-af9ee44f13d3"
}
```

### Response Example

```json
{
  "response": "Chat Status Changed To Denied",
  "error": false
}
```

## Delete Chats By ID

`DELETE /chats/:id`

### Request Example

`/chats/ebc92217-c05e-4c3a-9d27-af9ee44f13d3`

### Response Example

```json
{
  "response": "Chat Deleted Successfully",
  "error": false
}
```

## Get all messages via chatID and paging

`GET /messages/:chatId,:PerPage,:Page`

### Request Example

`/messages/4b5a9a3f-4d8d-4ac3-8472-8a071b378d89,10,0`

### Response Example

```json
{
  "response": [
    {
      "_id": "7f1fac97-bc7a-4c94-b612-deb81de00bb3",
      "chat_id": "4b5a9a3f-4d8d-4ac3-8472-8a071b378d89",
      "content": "ola mundo",
      "data_create": "2022-03-02T06:23:24.000Z",
      "status": "Delivered",
      "user_from_id": "ebf01b1f-e56e-4c42-969d-17a07bfd1e25",
      "user_to_id": "a9c87413-4cb2-4810-be9f-38566059ba31"
    }
  ],
  "count": 1,
  "error": false
}
```

## Post Messages by chatId

`POST /messages`

### Body Example

```json
{
  "content": "ola mundo",
  "chatId": "4b5a9a3f-4d8d-4ac3-8472-8a071b378d89"
}
```

### Response Example

```json
{
  "response": {
    "id": "4990d471-6934-4cf2-9e79-3a098ead41d9",
    "content": "ola mundo",
    "status": "Delivered",
    "dataCreated": "2022-03-02T03:32:19-03:00",
    "chatId": "4b5a9a3f-4d8d-4ac3-8472-8a071b378d89",
    "userTo": "a9c87413-4cb2-4810-be9f-38566059ba31",
    "userFrom": "ebf01b1f-e56e-4c42-969d-17a07bfd1e25"
  },
  "error": false
}
```

## Update Messages To Not Displayed By ID

`PATCH /messages/notDisplayed`

### Body Example

```json
{
  "id": "dac0fcb0-e03e-4a45-8db2-41f950d5b402"
}
```

### Response Example

```json
{
  "response": "Message Status Changed To Not Displayed",
  "error": false
}
```

## Update Messages To Displayed By ID

`PATCH /messages/Displayed`

### Body Example

```json
{
  "id": "dac0fcb0-e03e-4a45-8db2-41f950d5b402"
}
```

### Response Example

```json
{
  "response": "Message Status Changed To Displayed",
  "error": false
}
```

## Delete Messages By ID From UserFrom

`DELETE /messages/:id,:messageId`

### Request Example

`/messages/ebf01b1f-e56e-4c42-969d-17a07bfd1e25,4990d471-6934-4cf2-9e79-3a098ead41d9`

### Response Example

```json
{
  "response": "Message deleted successfully",
  "error": false
}
```
