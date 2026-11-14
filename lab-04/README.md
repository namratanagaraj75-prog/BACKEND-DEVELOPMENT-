# Lab 4: Registration, Login and JWT

## Student Details

- **Name:** Namrata
- **Registration Number:** 252U1R5111
- **Section:** AI/DE 2B S-011
- **Course:** Backend Development Fundamentals
- **Year:** II
- **Term:** II
- **University:** Aurora
- **Faculty:**

## Live Link

Not deployed. This local copy is prepared for local use; no hosting target was selected for this task.

## Objective

Build a simple registration and login API with Node.js and Express. User records are stored in SQLite, passwords are stored as bcrypt hashes, and a successful login returns a JWT containing only the username.

## Technologies Used

- Node.js and JavaScript (CommonJS)
- Express.js
- SQLite with the sqlite and sqlite3 packages
- bcrypt for password hashing and verification
- jsonwebtoken for JWT generation
- Postman for manual API testing

## Project Structure

BACKEND/

- lab-01/
- lab-02/
- lab-03/
- lab-04/
  - app.js
  - userData.db (created automatically when the server starts)
  - package.json
  - package-lock.json
  - README.md
  - screenshots/
    - 00-report-header.png
    - 01-server-running.png
    - 02-register-success.png
    - 03-register-duplicate.png
    - 04-login-success.png
    - 05-login-unknown-user.png
    - 06-login-wrong-password.png
    - 07-missing-fields-validation.png
    - 08-users-table-hashed-password.png
    - 09-jwt-decoded-header-and-payload.png

## Installation Instructions

Use Node.js 20.17 or newer, then open a terminal in the lab-04 folder and install the packages:

    npm install

The required packages are express, sqlite, sqlite3, bcrypt, and jsonwebtoken. To install them directly, use:

    npm install express sqlite sqlite3 bcrypt jsonwebtoken

## How to Run the Application

From the lab-04 folder, start the server with:

    $env:JWT_SECRET = 'replace-with-a-long-random-secret'
    npm start

You can also run `node app.js` directly.

`JWT_SECRET` is required to sign login tokens. Set a private value locally; do not commit it. The API listens at http://localhost:3000. The server opens userData.db and creates the user table before it starts accepting requests. Stop the server with Ctrl+C.

## Database Structure

Database file: userData.db

Table: user

| Column   | Type | Rule             |
| -------- | ---- | ---------------- |
| username | TEXT | UNIQUE           |
| name     | TEXT | User's name      |
| password | TEXT | bcrypt hash only |

All user-provided values in SQL statements are passed through parameterized queries. The original password is never inserted into the database.

## API Documentation

The API accepts and returns JSON. For requests with a body, choose Body > raw > JSON in Postman or set Content-Type to application/json.

## Registration API

- **HTTP method:** POST
- **API path:** /register
- **Purpose:** Create a new user account.
- **Request body:**

        {
          "username": "test-user",
          "name": "Test User",
          "password": "<test-only-password>"
        }

- **Successful response (HTTP 200):**

        {
          "success": true,
          "message": "User registered successfully."
        }

- **Error responses (HTTP 400):** A username already exists, a required field is missing, or the password has fewer than 5 characters.

## Login API

- **HTTP method:** POST
- **API path:** /login
- **Purpose:** Check a user's password and return a JWT after successful verification.
- **Request body:**

        {
          "username": "test-user",
          "password": "<test-only-password>"
        }

- **Successful response (HTTP 200):**

        {
          "jwt_token": "generated_jwt_token"
        }

- **Error responses (HTTP 400):** The username is not registered or the password is incorrect.

## JWT Authentication Explanation

The application creates the token with jsonwebtoken's jwt.sign() after bcrypt confirms the password. The payload is exactly one field: username. The token signing options omit the timestamp so the decoded payload contains no extra field. The signing secret is read from the `JWT_SECRET` environment variable and must not be committed or placed in the token payload.

A JWT has three parts separated by periods:

1. **Header:** identifies the token type and signing algorithm (jsonwebtoken uses HS256 by default).
2. **Payload:** contains the username only in this assignment.
3. **Signature:** proves the token was signed with the secret key and helps detect changes.

The header and payload can be decoded by a JWT viewer such as jwt.io. Decoding does not hide them; the signature is used to verify token integrity.

## Password Hashing Explanation

During registration, bcrypt.hash(password, 10) uses a work factor of 10 and stores the resulting hash in the password column. During login, bcrypt.compare() checks the entered password against that hash. The application does not store or return the plain-text password.

## Postman Testing

Start the server, then create POST requests to http://localhost:3000. For each request, select Body > raw > JSON.

1. **Successful registration:** POST /register with a new test username, name, and a test-only password of at least five characters. Expected status: 200.
2. **Duplicate registration:** send the same registration request again. Expected status: 400.
3. **Short password:** POST /register with a new username, any non-empty name, and a password shorter than 5 characters. Expected status: 400.
4. **Successful login:** POST /login with the test username and password registered above. Expected status: 200 with jwt_token.
5. **Incorrect password:** POST /login with username namrata and a different password. Expected status: 400.
6. **Unknown username:** POST /login with a username that has not been registered. Expected status: 400.

Use a fresh database for the successful registration test if the username is already present. To reset local test data, stop the server and remove userData.db; the application will create a new database and user table on the next start.

The report images are saved in the `screenshots/` folder using their headings as filenames.

## Screenshots

### 1. Backend Server Startup and Port Conflict

![Backend Server Startup and Port Conflict](screenshots/01-server-running.png)

This capture includes a later “port 3000 is already in use” message, so it is not evidence of an uninterrupted clean server run.

### 2. Successful User Registration

![Successful User Registration](screenshots/02-register-success.png)

### 3. Duplicate Username Validation

![Duplicate Username Validation](screenshots/03-register-duplicate.png)

### 4. Successful User Login and JWT Token Generation

![Successful User Login and JWT Token Generation](screenshots/04-login-success.png)

### 5. Login Attempt with an Unknown Username

![Login Attempt with an Unknown Username](screenshots/05-login-unknown-user.png)

### 6. Login Attempt with an Incorrect Password

![Login Attempt with an Incorrect Password](screenshots/06-login-wrong-password.png)

### 7. Required-Field Validation

![Required-Field Validation](screenshots/07-missing-fields-validation.png)

### 8. SQLite Users Table with Hashed Passwords

![SQLite Users Table with Hashed Passwords](screenshots/08-users-table-hashed-password.png)

Password hash values are redacted in the GitHub-safe screenshot copy.

### 9. Decoded JWT Token – Header and Payload

![Decoded JWT Token – Header and Payload](screenshots/09-jwt-decoded-header-and-payload.png)

## Expected Output

- A new unique username is registered with HTTP 200.
- A duplicate username and a password shorter than 5 characters are rejected with HTTP 400.
- Correct login credentials return HTTP 200 and a jwt_token value.
- An incorrect password or unknown username is rejected with HTTP 400.
- The SQLite password column contains a bcrypt hash, not the original password.

## Conclusion

This lab demonstrates registration, login, SQLite persistence, bcrypt password hashing, input checks, and JWT generation using a small CommonJS Express application.
