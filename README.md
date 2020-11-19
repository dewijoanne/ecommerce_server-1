# E-Commerce Server CMS

E-Commerce CMS is an server-side / admin-side application to manage E-Commerce client-side. 
It has: 
* RESTful endpoint for Product CRUD Operation
* Used Technology : 
    - Express Js, 
    - Sequelize, 
    - Postgres, 
    - Jest (JS Testing Framework)
    - Json Web Token, 
    - Bcrypt
* JSON Formated Response
* Documentation: https://documenter.getpostman.com/view/5729395/TVes7SC7
* Deploy link: https://orangechenka.web.app


## RESTful endpoints

## Users Routes

### POST /register

> Register
_Request Header_
```
no need
```

_Request Body_
```json
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (201)_
```json
{
    "email": "admin@mail.com",
    "message": "Successfully registered"
}
```
_Response (401 - Bad Request)_
```json
{
    "errors": [
        "Invalid email format",
        "Email is required!",
        "Email has been taken!",
        "Password is required!",
        "password must 6-15 characters"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

### POST /login

> Login
_Request Header_
```
no need
```

_Request Body_
```json
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (200)_
```json
{
    "access_token": "<your access token>"
}
```
_Response (400 - Bad Request)_
```json
{
    "errors": [
        "Register first!",
         "Invalid username or password!"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```


## Products Routes

### POST /products

> Create new products
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>"
}
```

_Response (201 - Created)_
```json
{
    "id": 3,
    "name": "PS5",
    "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
    "price": 1000000,
    "stock": 30,
    "category": "Game Console",
    "updatedAt": "2020-11-19T04:06:13.676Z",
    "createdAt": "2020-11-19T04:06:13.676Z"
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name is required!, Image Url is required!, Price may not set less than 0, Stock may not set less than 0"
}
```

### GET /products

> Show all products
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Body_
```
no need
```

_Response (200)_
```json
{
    "products": [
        {
            "id": 3,
            "name": "PS5",
            "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
            "price": "Rp 1,000,000",
            "stock": 30,
            "category": "Game Console",
            "createdAt": "2020-11-19T04:06:13.676Z",
            "updatedAt": "2020-11-19T04:06:13.676Z"
        }
    ]
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}
```

### GET /products/:id

> Get product by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```
_Request Params_
```
<product ID>
```

_Request Body_
```
no need
```

_Response (200)_
```json
{
    "id": 3,
    "name": "PS5",
    "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
    "price": 1000000,
    "stock": 30,
    "category": "Game Console",
    "createdAt": "2020-11-19T04:06:13.676Z",
    "updatedAt": "2020-11-19T04:06:13.676Z"
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Null"
}
```

### PUT /products/:id

> Update product by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Params_
```
<product ID>
```

_Request Body_
```json
{
    "id": 3,
    "name": "PS5 Baru",
    "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
    "price": 1000000,
    "stock": 30,
    "category": "Game Console",
    "createdAt": "2020-11-19T04:06:13.676Z",
    "updatedAt": "2020-11-19T04:06:13.676Z"
}
```

_Response (200)_
```json
{
    "msg": "Successfully updated!"
}
```

_Response (400 - Bad request)_
```json
{
  "message":  "Name is required!, Image Url is required!, Price may not set less than 0, Stock may not set less than 0"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### DELETE /products/:id

> Delete products by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Params_
```
<product ID>
```

_Request Body_
```
no need
```

_Response (200)_
```json

{
    "msg": "Successfully deleted!"
}

```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

## Banners Routes

### POST /banners

> Create new banners
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Body_
```json
{
  "title": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "status": "<price to get insert into>",
}
```

_Response (201 - Created)_
```json
{
    "id": 2,
    "title": "PS5",
    "status": "on",
    "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
    "updatedAt": "2020-11-19T04:10:12.232Z",
    "createdAt": "2020-11-19T04:10:12.232Z"
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Title is required!, Image Url is required!, Status is required!"
}
```

### GET /banners

> Show all banners
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Body_
```
no need
```

_Response (200)_
```json
[
    {
        "id": 2,
        "title": "PS5",
        "status": "on",
        "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
        "createdAt": "2020-11-19T04:10:12.232Z",
        "updatedAt": "2020-11-19T04:10:12.232Z"
    }
]
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}
```

### GET /banners/:id

> Get banner by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```
_Request Params_
```
<banner ID>
```

_Request Body_
```
no need
```

_Response (200)_
```json
{
    "id": 2,
    "title": "PS5",
    "status": "on",
    "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
    "createdAt": "2020-11-19T04:10:12.232Z",
    "updatedAt": "2020-11-19T04:10:12.232Z"
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Null"
}
```

### PUT /banners/:id

> Update banner by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Params_
```
<banner ID>
```

_Request Body_
```json
{
    "title": "PS5 baru",
    "image_url": "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
    "status": "off"
}
```

_Response (200)_
```json
{
    "msg": "Successfully updated!"
}
```

_Response (400 - Bad request)_
```json
{
  "message":  "Title is required!, Image Url is required!, Status is required!"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### DELETE /banners/:id

> Delete banners by ID
_Request Header_
```json
{
  "access_token": "<user access token>"
}
```

_Request Params_
```
<banner ID>
```

_Request Body_
```
no need
```

_Response (200)_
```json

{
    "msg": "Successfully deleted!"
}

```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```