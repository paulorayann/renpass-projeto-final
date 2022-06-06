<h1 align="center">Final Project - Renpass.UOL</h1>

<h6 align="center">
  Compasso.UOL entered in a new branch of the market, Renpass.UOL. A luxury and semi-luxury car rental segment. This API will be reponsible for some endpoints of cars and people.
</h6>
<p align="center">
 <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
 <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
 <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
 <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/>
 <img src="http://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge"/>
</p>

> Status: 👷‍♂️ (WIP)

# Info about the project :books:

## Libs:

-   [express: v4.18.1](https://expressjs.com/pt-br/)
-   [joi: v17.6.0](https://www.npmjs.com/package/joi)
-   [mongoose: v6.3.4](https://mongoosejs.com/docs/api.html)
-   [mongoose-paginate: ](https://www.npmjs.com/package/mongoose-paginate)
-   [dotenv: v16.0.1](https://www.npmjs.com/package/dotenv)
-   [moment: v2.29.3](https://www.npmjs.com/package/moment)
-   [mongoose-paginate-v2: v1.6.3](https://www.npmjs.com/package/mongoose-paginate-v2)
-   [bcryptjs: v2.4.3](https://www.npmjs.com/package/bcryptjs)
-   [jsonwebtoken": v8.5.1](https://www.npmjs.com/package/jsonwebtoken)

### Node Version:

```
v14.17.0
```

### NPM Version:

```
v6.14.13
```

...

## How to run the application :arrow_forward:

#### Clone the project

```
git clone https://github.com/paulorayann/renpass-projeto-final.git
```

...

#### Install the dependencies:

```
npm install
```

...

#### Set up the environment variables (.env)

You will need to create a .env in the project root directory.
There is an .env.example you can freely use.

```
DB_HOST = localhost
DB_USER =
DB_PASS =
DB_NAME = dbName_example
DB_PORT = 3000
DB_COLLECTION = collection_example
```

...

#### Run the application server

```
npm run dev
```
<br>

> #### You can use the [demo.md](demo.md) file in the project root directory to assist you in the population of Person, Car and Authorization.


...

# 👨‍👩‍👧‍👦 Person Endpoints

## Create Person

`POST`

```
http://localhost:3000/api/v1/person/
```

### Body Example

```
{
    "name": "Eduardo Pereira",
    "cpf": "607.041.460-88",
    "birthday": "09/05/2002",
    "email": "email234@email.com",
    "password": "123456435464",
    "canDrive": "yes"
}
```

...

`Status Code: 201 Created`

```
{
    "name": "Eduardo Pereira",
    "cpf": "607.041.460-88",
    "birthday": "09/05/2002",
    "email": "email234@email.com",
    "password": "$2a$10$2t/vGjcqtpGtymnVvkWkZuzWwxb.1FXFQUBaBs5T5siL84NVZnSwi",
    "canDrive": "yes",
    "_id": "629d69b18496122729f95787"
}
```

...

`Status Code: 400 Bad Request`

```

    "message": "Bad Request",
    "details": [
        {
            "message": "error message of the request"
        }
    ]
}
```

...

## List All Person:

`GET`

```
http://localhost:3000/api/v1/person/
```

...

`Status Code: 200 OK`

```
{
    "Person": [
        {
            "_id": "629d234406e1aa26ad7b669a",
            "name": "Carlos Mota",
            "cpf": "042.123.113-50",
            "birthday": "03/05/2002",
            "email": "email1@email.com",
            "password": "$2a$10$tSmrtsA6Q3ZN4aS7YA72Ie4hu4cFjoBPEaEig09a7Yy4S1uQQUH4q",
            "canDrive": "yes"
        },
        {
            "_id": "629d236606e1aa26ad7b66a0",
            "name": "Maria Eduarda",
            "cpf": "905.880.740-12",
            "birthday": "07/09/1995",
            "email": "email@email.com",
            "password": "$2a$10$wR9j.0IVI1N265i4xZJvt.NZOZEQx8b5C1lLNJqCiOp3DWW0klyYK",
            "canDrive": "no"
        }
    ],
    "total": 23,
    "offset": 1,
    "limit": 5,
    "offsets": 5
}
```

...

`Status Code: 400 Bad Request`

```

    "message": "Bad Request",
    "details": [
        {
            "message": "error message of the request"
        }
    ]
}
```

...

## List Person by Id:

`GET`

```
http://localhost:3000/api/v1/person/:id
```

...

`Status Code: 200 OK`

```
{
    "_id": "629d69b18496122729f95787",
    "name": "Eduardo Pereira",
    "cpf": "607.041.460-88",
    "birthday": "09/05/2002",
    "email": "email234@email.com",
    "password": "$2a$10$2t/vGjcqtpGtymnVvkWkZuzWwxb.1FXFQUBaBs5T5siL84NVZnSwi",
    "canDrive": "yes"

}
```

...

`Status Code: 404 Not Found`

```
{
    "errorStatus": 404,
    "name": "NotFound",
    "message": "Id '629d234406e1aa26ad7b669b' not found"
}
```

...

## Update Person

`PATCH`

```
http://localhost:3000/api/v1/person/:id
```

### Body Example

```
{
    "name": "Leo Guimarães Moraes",
    "email": "leomoraes@gmail.com",
}
```

`Status Code: 200 OK`

```
{
    "_id": "629d234406e1aa26ad7b669a",
    "name": "Leo Guimarães Moraes",
    "cpf": "042.123.113-50",
    "birthday": "09/07/1992",
    "email": "leomoraes@gmail.com",
    "password": "$2a$10$tSmrtsA6Q3ZN4aS7YA72Ie4hu4cFjoBPEaEig09a7Yy4S1uQQUH4q",
    "canDrive": "yes"
}

```

`Status Code: 404 Not Found`

```
{
    "errorStatus": 404,
    "name": "NotFound",
    "message": "Id '629d234406e1aa26ad7b669b' not found"
}
```

...

## Delete Person

`DELETE`

```
http://localhost:3000/api/v1/person/:id
```

`Status Code: 204 No Content`

`Status Code: 404 Not Found`

```
{
    "errorStatus": 404,
    "name": "NotFound",
    "message": "Id '629d234406e1aa26ad7b669b' not found"
}
```

...

# 🚗 Car Endpoints

## Create Car

`POST`

```
http://localhost:3000/api/v1/car/
```

### Body Example

```
{
    "model": "Celta",
    "type": "Hatch",
    "brand": "Chevrolet",
    "color": "green",
    "year": "2012",
    "accessories": [
        {
            "description": "Direção Hidráulica"
        },
        {
            "description": "Preto"
        }

    ],
    "passengersQtd": 4
}

```

...

`Status Code: 201 Created`

```
{
    "model": "Celta",
    "type": "Hatch",
    "brand": "Chevrolet",
    "color": "green",
    "year": "2012",
    "accessories": [
        {
            "description": "Direção Hidráulica"
        },
        {
            "description": "Preto"
        }
    ],
    "passengersQtd": 4,
    "_id": "629d6f808496122729f95797"
}
```

...

`Status Code: 400 Bad Request`

```
{
    "message": "Bad Request",
    "details": [
        {
            "message": "error message of the request"
        }
    ]
}
```

...

## List All Car:

`GET`

```
http://localhost:3000/api/v1/car/
```

...

`Status Code: 200 OK`

```
{
    "Car": [
        {
            "_id": "629d26609dd107c80dc0ac26",
            "model": "celta",
            "type": "Hatch",
            "brand": "chevrolet",
            "color": "green",
            "year": "2015",
            "accessories": [
                {
                    "description": "Direção Hidráulica"
                },
                {
                    "description": "Azul"
                }
            ],
            "passengersQtd": 4
        },
        {
            "_id": "629d26699dd107c80dc0ac2a",
            "model": "voyage",
            "type": "hatch",
            "brand": "volkswagen",
            "color": "green",
            "year": "1980",
            "accessories": [
                {
                    "description": "Azul"
                },
                {
                    "description": "Direção Hidráulica"
                }
            ],
            "passengersQtd": 4
        }
    ],
    "total": 9,
    "offset": 1,
    "limit": 5,
    "offsets": 2
}
```

...

## List car by Id:

`GET`

```
http://localhost:3000/api/v1/car/:id
```

...

`Status Code: 200 OK`

```
{
    "_id": "629d50c74b396ae814091cfd",
    "model": "celta",
    "type": "hatch",
    "brand": "chevrolet",
    "color": "green",
    "year": "2013",
    "accessories": [
        {
            "description": "azul"
        },
        {
            "description": "ar condicionado"
        }
    ],
    "passengersQtd": 4
}
```

...

`Status Code: 404 Not Found`

```
{
    "errorStatus": 404,
    "name": "NotFound",
    "message": "Id '629d234406e1aa26ad7b669b' not found"
}
```

...

## Update Car

`PATCH`

```
http://localhost:3000/api/v1/car/:id
```

### Body Example

```
{
    "model": "Voyage",
    "brand": "Volkswagen",
}
```

`Status Code: 200 OK`

```
{
    "_id": "629d50c74b396ae814091cfd",
    "model": "Voyage",
    "type": "hatch",
    "brand": "Volkswagen",
    "color": "green",
    "year": "2013",
    "accessories": [
        {
            "description": "azul"
        },
        {
            "description": "ar condicionado"
        }
    ],
    "passengersQtd": 4
}

```

`Status Code: 404 Not Found`

```
{
    "errorStatus": 404,
    "name": "NotFound",
    "message": "Id '629d234406e1aa26ad7b669b' not found"
}
```

...

## Delete Car

`DELETE`

```
http://localhost:3000/api/v1/car/:id
```

`Status Code: 204 No Content`

`Status Code: 404 Not Found`

```
{
    "errorStatus": 404,
    "name": "NotFound",
    "message": "Id '629d234406e1aa26ad7b669b' not found"
}
```

...

# 👨‍💻 Authenticate Endpoint:

## Authenticate:

`POST`

```
http://localhost:3000/api/v1/authenticate
```

### Body Example

```
{
    "email": "email@email.com",
    "password": "123456435464"
}

```

...

`Status Code: 201 Created`

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWQyYmRjMjA3Mjc4ODhiNzZlNmI4ZiIsImlhdCI6MTY1NDQ4NjU1OSwiZXhwIjoxNjU0NTcyOTU5fQ.ieh4BP2MeHOoIx912LP1UyM-09R5_A28SLf_mtuccJY",
    "email": "email@email.com",
    "canDrive": "yes"
}
```

...

`Status Code: 404 Bad Request`

```
{
    "error": "Person not found"
}
```

...

## Author

### Paulo Rayann - [Github](https://github.com/paulorayann)

...

## License

The [MIT License](https://opensource.org/licenses/MIT) (MIT)

Copyright :copyright: 2022 - Renpass.UOL
