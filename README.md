## Installation

```bash
$ npm install
```
Create and fill out .env.development file by sample. (DB_URL only for production)

## Running the app
Start postgres locally.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Routes

### Sign up
POST http://localhost:{PORT}/api/auth/sign-up

Body:
```javascript
{
    "email": "test.test@gmail.com",
    "password": "12345678",
    "firstName": "Test",
    "lastName": "Test"
}
```
Response: 
```javascript
{
    "access_token": {JWT_TOKEN}
}
```

### Log in
POST http://localhost:{PORT}/api/auth/log-in

Body:
```javascript
{
    "email": "test.test@gmail.com",
    "password": "12345678"
}
```
Response: 
```javascript
{
    "access_token": {JWT_TOKEN}
}
```

### Post creation 
POST http://localhost:{PORT}/api/posts/create

Body:
```javascript
{
    {
    "title":"test",
    "content": "test"
    "description": "test" - optional
    }
}
```
Response: 
```javascript
{
    {
    "title": "test",
    "content": "test",
    "description": "test",
    "id": {ID},
    "createdAt": {CREATE_AT}
    }
}
```

### Get list of posts
GET http://localhost:{PORT}/api/posts/list

Response: 
```javascript
[
    {
        "id": {ID},
        "title": "test",
        "content": "test",
        "description": "test",
        "createdAt": {CREATE_AT},
        "user": {
            "id": {USER_ID},
            "firstName": "Test",
            "lastName": "Test"
        }
    }
]
```

### Get post by id
GET http://localhost:{PORT}/api/posts/{ID}

Response: 
```javascript
{
    "id": {ID},
    "title": "test",
    "content": "test",
    "description": "test",
    "createdAt": {CREATE_AT},
    "user": {
        "id": {USER_ID},
        "firstName": "Test",
        "lastName": "Test"
    }
}
```