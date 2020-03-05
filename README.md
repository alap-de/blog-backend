# Blog Backend API
A basic blog API with authentication, authorization and CRUD operations

### Setup
Download the project, then
```
npm install
```

In example-nodemon.json
```
{
    "env":{
        "private_key": "your private key"
    }
}
```
and remove 'example-' from the file name

### Postman Collection
```
https://www.getpostman.com/collections/3079f5e1de0c59db765c
```

## Features
- Register
- Login
- Create post
- Get posts (with/without login)
- Get a post (with/without login)
- Edit post
- Delete post
- Add comment to a post
- Delete comment from a post

## Packages Used
* [Express](https://www.npmjs.com/package/express) - The web framework used
* [Mongoose](https://www.npmjs.com/package/mongoose) - The ODM used
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Used to hash passwords
* [JWT](https://www.npmjs.com/package/jsonwebtoken) - Used for authentication and authorization
* [ExpressJS Async Errors](https://www.npmjs.com/package/express-async-errors) - Used to catch errors without try...catch block for cleaner code
* [express-validator](https://www.npmjs.com/package/express-validator) - Used to validate incoming request data
* [body-parser](https://www.npmjs.com/package/body-parser) - Used to parse incoming request bodies
