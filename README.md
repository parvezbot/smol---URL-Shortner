# smol - URL Shortner
API to convert large URL to short URL.


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


```json
{
    "originalUrl":"https://instagram.com"
}
```

5. API to Get Original URL: [GET] 
[http://54.250.65.130:4000/:url](http://54.250.65.130:4000/:url)

If authenticated, enter the shortend URL (shortid) in the params ( /:url )to redirect to Original URL.
