// server.js
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const cors = require('cors')

let db = require('./config/db')
const app = express()
const port = 8080

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))


MongoClient.connect(db.url, (err, db) => {
  if (err) {
    return console.log(err)
  }

  db = db.db("ahadb")
  require('./app/routes')(app, db)

  app.listen(port, () => {
    console.log('We are live on ' + port)
  })
})




