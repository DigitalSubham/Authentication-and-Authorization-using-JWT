# Authentication and Authorization using JWT (only backend)

- creating a basic backend application for signup and login

created index.js models, routes, config and controller, middleware every code is same except controller and middleware one so lets understand controller and middleware code

## controller auth.js

- signup

  - fetch data from req body
  - check for already registered users
  - if user already exits -> return response
  - Hash the password using (bcrypt module) => if successful, store to hashPassword variable if error return response
  - insert user entry to database (with hashpassword) - if successful return succesfull response else error response

- signin
  - email/password fetch from req body
  - validation of email/password
  - check if user is exist or not if not exist return response
  - compare password if false return response if true create jwt tokens (using jwt.sign method) then add new values(token and password undefined) to existing user ( user = user.toObject(); user.token = token; user.password = undefined;) and res.cookie() and return response

## middleware

### created checkForAuthenticationCookie middleware

Authentication Middleware (auth function):
- This middleware is designed to be inserted into routes to ensure that the incoming request has a valid JWT in its body.
- It first attempts to extract the JWT token from the request body.

- we can mainly extract JWT token in 3 ways
  - from body using '''req.body.token''' (we have to also defined body parser => express.json() )
  - from cookies using '''req.cookies.token''' (we have to also defined cookie parser ),
  - from header using '''req.header("Authorization").replace("Bearer ", "");''' (most prefered way better security)

- If the token is missing, it responds with a 401 status and a message indicating that the token is missing.
- If the token is present, it attempts to verify its authenticity using the secret stored in the environment variable JWT_SECRET.
- If the verification is successful, it decodes the token and attaches the decoded user information to the request object to fetch role and used in next middlewares (req.user).
- If the verification fails, it responds with a 401 status and a message indicating that the token is invalid.
- If any errors occur during this process, it responds with a 401 status and a generic error message.

### created isStudent middleware

#### Authorization Middleware for Students (isStudent function):
- This middleware checks if the user attached to the request (req.user) has the role of "Student."
- If the user is not a student, it responds with a 401 status and a message indicating that the route is protected for students.
- If any errors occur during this process, it responds with a 500 status and a generic error message.

### created isAdmin middleware

#### Authorization Middleware for Admins (isAdmin function):
- This middleware checks if the user attached to the request (req.user) has the role of "Admin."
- If the user is not an admin, it responds with a 401 status and a message indicating that the route is protected for admins.
- If any errors occur during this process, it responds with a 500 status and a generic error message.

## we have 5 API for testing Authentication and Authorization (Testing using Postman)

- http://localhost:3000/user/signup (for signUp )
- http://localhost:3000/user/signin (for signIn )
- http://localhost:3000/user/test (using auth middleware and this api is for authorization )
- http://localhost:3000/user/student (using auth and isStudent middleware and this api is for student authorization )
- http://localhost:3000/user/admin (using auth and isAdmin middleware and this api is for admin authorization )
