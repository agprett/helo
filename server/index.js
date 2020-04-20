const express = require('express')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const usersCtrl = require('./Controllers/usersController')
const postsCtrl = require('./Controllers/postsController')

const app = express()

app.use(express.json())
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}))

app.post('/api/auth/login', usersCtrl.login)
app.post('/api/auth/logout', usersCtrl.logout)
app.post('/api/auth/register', usersCtrl.register)
app.get('/api/auth/me', usersCtrl.getUser)

app.get('/api/posts/:userid', postsCtrl.getPosts)
app.get('/api/post/:postid', postsCtrl.getPost)
app.post('/api/post/:userid', postsCtrl.addPost)
app.put('/api/post/:postid', postsCtrl.updatePost)
app.delete('/api/post/:postid', postsCtrl.deletePost)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB connected')
  app.listen(SERVER_PORT, () => console.log(`Docked at port ${SERVER_PORT}`))
})