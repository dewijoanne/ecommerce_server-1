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
* Documentation: https://documenter.getpostman.com/view/5729395/TVep8TLU


## RESTful endpoints

## Users Routes

### POST /login
> Login User

_Request Header_
```
no need
```

_Request Body_
```
{
  "email": "<email to get login>",
  "password": "<password to get login>"
}
```

_Response (200)_
```
{
    "access_token": "<access_token JWT>",
    "id": "<user id>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "email cannot be empty" ||
              "password cannot be empty"
}
```

_Response (404 - Not Found)_
```
{
    "message": "data not found"
}
```

### Global endpoints

_Response (401 - Unauthorized)_
```
{
  "message": "Not authroized to do the actions"
}
```

_Response (500 - Error)_
```
{
  "message": "internal server error"
}
```


## Products Routes

### GET /products
> Get all products 

_Request Header_
```
{
    "access_token": "<access_token>"
}
```

_Request Body_
```
no need
```

_Response (200)_
```
[
    {
        "id": "<show id data>",
        "name": "<show name data>",
        "image_url": "<show image_url data>",
        "price": "<show price data>",
        "stock": "<show stock data>",
        "createdAt": "<show createdAt data>",
        "updatedAt": "<show updatedAt data>"
    },
    {
        "id": "<show id data>",
        "name": "<show name data>",
        "image_url": "<show image_url data>",
        "price": "<show price data>",
        "stock": "<show stock data>",
        "createdAt": "<show createdAt data>",
        "updatedAt": "<show updatedAt data>"
    }
]
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```


### GET /products/:id
> Get product base on selected id

_Request Header_
```
{
    "access_token": "<access_token>"
}
```

_Request Parameter_
```
  "id": "<selected product id>"
```

_Request Body_
```
no need
```

_Response (200)_
```
{
    "id": "<show id by requested id>",
    "name": "<show name by requested id>",
    "image_url": "<show image_url by requested id>",
    "price": "<show price by requested id>",
    "stock": "<show stock by requested id>",
    "createdAt": "<show createdAt by requested id>",
    "updatedAt": "<show updatedAt by requested id>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

### POST /products
> Create new product

_Request Header_
```
{
    "access_token": "<access_token>"
}
```

_Request Body_
```
{
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price get insert into>",
    "stock": "<stock get insert into>",
}
```

_Response (201)_
```
{
    "id": <given id by system>,
    "name": "<show name data>",
    "image_url": "<show image_url data>",
    "price": "<show price data>",
    "stock": "<show stock data>",
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>"
}
```

_Response (400 - Bad Request)_
```
{
  "message" : "name cannot be empty" || 
              "image_url cannot be empty" || 
              "price cannot be empty" || 
              "stock cannot be empty" || 
              "Price and Stock must be more then 0" || 
              "Price and Stock must be a Number"
}
```


### PUT /products/:id
> Update existing product base on selected id

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
```

_Request Parameter_
```
  "id": "<selected product id>"
```

_Request Body_
```
{
    "name": "<name to get update into>",
    "image_url": "<image_url to get update into>",
    "price": "<price to get update into>",
    "stock": "<price to get update into>",
}
```

_Response (200)_
```
{
    "id": "<id to get update into>",
    "name": "<name to get update into>",
    "image_url": "<image_url to get update into>",
    "price": "<price to get update into>",
    "stock": "<stock to get update into>",
    "createdAt": "<createdAt to get update into>",
    "updatedAt": "<updatedAt to get update into>"
}
```

_Response (400 - Bad Request)_
```
{
  "message" : "name cannot be empty" || 
              "image_url cannot be empty" || 
              "Price cannot be empty" || 
              "Stock cannot be empty" || 
              "Price and Stock must be more then 0" || 
              "Price and Stock must be a Number"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

### DELETE /products/:id
> Delete product base on selected id

_Request Header_
```
{
    "access_token": "<access_token>"
}
```

_Request Body_
```
no need
```

_Response (200)_
```
{
    "id": "<contain id that deleted>",
    "name": "<contain name that deleted>",
    "image_url": "<contain image_url that deleted>",
    "price": "<contain price that deleted>",
    "stock": "<contain stock that deleted>",
    "createdAt": "<contain createdAt that deleted>",
    "updatedAt": "<contain updatedAt that deleted>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "please fill all fields"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```


