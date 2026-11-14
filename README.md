| Field | Details |
|---|---|
| Student Name | Namrata |
| Registration Number | 252U1R5111 |
| Course | Backend Development Fundamentals |
| Year | II |
| Term | II |
| Institution | Aurora University |
| Programme | B.Tech – Computer Science and Engineering |
| Specialisation | AI & Data Engineering |
| Academic Year | 2026 |

# Backend Development Labs

This repository contains four separate Node.js backend labs. Each lab remains in its own folder and has its own dependencies, source files, and documentation.

## Lab Index

| Lab Number | Lab Title | Description |
|---|---|---|
| Lab 1 | Node.js and Express Server | Builds a basic HTTP server and an Express server with welcome, about, time, and not-found routes. |
| Lab 2 | SQLite Database and CRUD Routes | Connects Express to SQLite and implements create, read, update, and delete routes for book records. |
| Lab 3 | REST API, Query Parameters, Validation, and Debugging | Extends the books API with search, sorting, pagination, price filters, input validation, and JSON errors. |
| Lab 4 | Registration, Login and JWT | Implements registration and login with SQLite, bcrypt password hashing, and a JWT response after successful login. |

## Lab 1 — Node.js and Express Server

- **Objective:** Set up a plain Node.js HTTP server and an Express server with basic routes.
- **Technologies and tools:** Node.js, JavaScript, Express.js, and npm.
- **Concepts and implementation:** HTTP server creation, Express routing, JSON responses, `app.listen()`, and 404 handling. The `/about` route returns the student name and section; `/time` returns the current time.
- **Run:** In `lab-01/`, run `npm install`, then `npm start` for Express or `npm run start:http` for the built-in HTTP server. Both use port 3000, so run only one at a time.
- **Screenshots:** No actual screenshots are currently included; `lab-01/screenshots/README.md` lists suggested captures.

## Lab 2 — SQLite Database and CRUD Routes

- **Objective:** Connect an Express app to SQLite and expose book CRUD operations.
- **Technologies and tools:** Node.js, JavaScript, Express.js, SQLite, `sqlite`, `sqlite3`, Nodemon, and Postman.
- **Concepts and implementation:** Asynchronous database access, parameterized SQL queries, HTTP methods, book lookup, and 404 handling for unknown IDs.
- **Run:** In `lab-02/`, run `npm install` and then `npm run dev`. The app uses the `books.db` file in that folder and listens on port 3000.
- **Screenshots:** No actual screenshots are currently included; `lab-02/screenshots/README.md` lists suggested captures.

## Lab 3 — REST API, Query Parameters, Validation, and Debugging

- **Objective:** Provide a book REST API with query-based search and filtering, pagination, and request validation.
- **Technologies and tools:** Node.js, JavaScript, Express 5, SQLite, `sqlite`, `sqlite3`, and Postman.
- **Concepts and implementation:** CRUD endpoints, parameterized SQL, title search, sorting, pagination, price ranges, input validation, and JSON error handling. The app expects the existing `books.db` beside `app.js`.
- **Run:** In `lab-03/`, run `npm install` and then `npm start`. The API listens on port 3000 by default; `PORT` can be set to use another port.
- **Screenshots:** Thirteen actual screenshots are included in `lab-03/screenshots/`.

## Lab 4 — Registration, Login and JWT

- **Objective:** Implement user registration and login with stored password hashes and a JWT for successful login.
- **Technologies and tools:** Node.js, JavaScript, Express, SQLite, `sqlite`, `sqlite3`, bcrypt, jsonwebtoken, and Postman.
- **Concepts and implementation:** JSON request parsing, parameterized SQLite queries, duplicate username checks, bcrypt hashing and comparison, input validation, and JWT payloads containing the username.
- **Run:** In `lab-04/`, set a private `JWT_SECRET` environment variable, run `npm install`, and then `npm start`. The app listens on port 3000 and creates its `user` table in `userData.db`.
- **Screenshots and report:** Nine actual report screenshots are included in `lab-04/screenshots/`. The completed report is [Lab Report 4 — Registration, Login and JWT](lab-04/Lab%20Report%204%20-%20Registration%2C%20Login%20and%20JWT.docx).
- **Screenshot note:** The available server capture also shows a later port-3000-in-use error; a clean, uninterrupted server-running screenshot is not available.

## Repository Contents

```text
BACKEND/
├── lab-01/
├── lab-02/
├── lab-03/
├── lab-04/
└── README.md
```

Each lab is an independent project. Install dependencies from the relevant lab folder before running it.
