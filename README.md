# smol - URL Shortner
API to convert large URL to short URL.

## Postman Link

[https://www.postman.com/altimetry-observer-66846788/workspace/mathongo/collection/26899103-8fcc880c-f21e-4d02-90a7-bf55dc1fdd4d?action=share&creator=26899103](https://www.postman.com/altimetry-observer-66846788/workspace/mathongo/collection/26899103-8fcc880c-f21e-4d02-90a7-bf55dc1fdd4d?action=share&creator=26899103)

Change the environment to prod or dev according to the need.

## Postman Doc
[https://documenter.getpostman.com/view/26899103/2s93Y3ufjy](https://documenter.getpostman.com/view/26899103/2s93Y3ufjy)

## AWS Endpoints
[http://54.250.65.130:4000](http://54.250.65.130:4000)

## Usage
1. API to Create User: [POST]
[http://54.250.65.130:4000/users](http://54.250.65.130:4000/users)

    Create user using:

   name: string *len>=3

   email: string *regex match - valid email

   password: hex string *len>=6, 1 lowercase, 1 uppercase, 1 special character


```json
{
    "name":"user2",
    "email":"user2@gmail.com",
    "password":"Qwerty@"
}
```

2. API to Login User: [POST] 
[http://54.250.65.130:4000/users/login](http://54.250.65.130:4000/users/login)

   Login user by entering valid email and password.


```json
{
    "email":"user@gmail.com",
    "password":"Qwerty@"
}
```

3. Logout User
[http://54.250.65.130:4000/users/logout](http://54.250.65.130:4000/users/logout)

Logout user returns 200 if successfuly logged out.

4. API to Add Original URL: [POST]
[http://54.250.65.130:4000/url](http://54.250.65.130:4000/url)

If authenticated, enter the URL which is to be shortened.

Rate Limiting: A user can only create a maximum of 10 short URLs per hour.


```json
{
    "originalUrl":"https://instagram.com"
}
```

5. API to Get Original URL: [GET] 
[http://54.250.65.130:4000/:url](http://54.250.65.130:4000/:url)

If authenticated, enter the shortend URL (shortid) in the params ( /:url )to redirect to Original URL.
