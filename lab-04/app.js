const path = require('path')
const express = require('express')
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
const port = 3000
const databasePath = path.join(__dirname, 'userData.db')
const jwtSecret = process.env.JWT_SECRET

let db

app.use(express.json())

app.post('/register', async (request, response, next) => {
  try {
    const body = request.body

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return response.status(400).json({ success: false, error: 'Request body must be a JSON object.' })
    }

    const username = typeof body.username === 'string' ? body.username.trim() : ''
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!username) {
      return response.status(400).json({ success: false, error: 'Username is required.' })
    }

    const existingUser = await db.get('SELECT username FROM "user" WHERE username = ?;', [username])
    if (existingUser) {
      return response.status(400).json({ success: false, error: 'Username already exists.' })
    }

    if (!name) {
      return response.status(400).json({ success: false, error: 'Name is required.' })
    }

    if (!password) {
      return response.status(400).json({ success: false, error: 'Password is required.' })
    }

    if (password.length < 5) {
      return response.status(400).json({ success: false, error: 'Password must contain at least 5 characters.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.run(
      'INSERT INTO "user" (username, name, password) VALUES (?, ?, ?);',
      [username, name, hashedPassword],
    )

    return response.status(200).json({ success: true, message: 'User registered successfully.' })
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      return response.status(400).json({ success: false, error: 'Username already exists.' })
    }

    return next(error)
  }
})

app.post('/login', async (request, response, next) => {
  try {
    const body = request.body

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return response.status(400).json({ success: false, error: 'Request body must be a JSON object.' })
    }

    const username = typeof body.username === 'string' ? body.username.trim() : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!username || !password) {
      return response.status(400).json({ success: false, error: 'Username and password are required.' })
    }

    const user = await db.get(
      'SELECT username, password FROM "user" WHERE username = ?;',
      [username],
    )

    if (!user) {
      return response.status(400).json({ success: false, error: 'Invalid username.' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return response.status(400).json({ success: false, error: 'Incorrect password.' })
    }

    const payload = { username: username }
    const token = jwt.sign(payload, jwtSecret, { noTimestamp: true })

    return response.status(200).json({ jwt_token: token })
  } catch (error) {
    return next(error)
  }
})

app.use((request, response) => {
  response.status(404).json({ success: false, error: 'Endpoint not found.' })
})

app.use((error, request, response, next) => {
  if (response.headersSent) {
    return next(error)
  }

  if (error.type === 'entity.parse.failed') {
    return response.status(400).json({ success: false, error: 'Request body contains invalid JSON.' })
  }

  console.error('Unexpected server error:', error.message)
  return response.status(500).json({ success: false, error: 'An unexpected server error occurred.' })
})

async function startServer() {
  if (!jwtSecret) {
    console.error('JWT_SECRET is required. Set it in the environment before starting the server.')
    process.exitCode = 1
    return
  }

  try {
    db = await open({ filename: databasePath, driver: sqlite3.Database })

    await db.exec(`
      CREATE TABLE IF NOT EXISTS "user" (
        username TEXT UNIQUE,
        name TEXT,
        password TEXT
      );
    `)

    const server = app.listen(port, () => {
      console.log('Server running at http://localhost:' + port)
      console.log('Using SQLite database: ' + databasePath)
    })

    server.on('error', async (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error('Port ' + port + ' is already in use. Stop the other server and try again.')
      } else {
        console.error('Server error: ' + error.message)
      }

      if (db) {
        await db.close().catch(() => {})
      }
      process.exitCode = 1
    })
  } catch (error) {
    console.error('Database startup error: ' + error.message)

    if (db) {
      await db.close().catch(() => {})
    }
    process.exitCode = 1
  }
}

module.exports = app
startServer()