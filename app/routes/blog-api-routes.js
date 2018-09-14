let ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

  // get post route
  app.get('/posts/:id', (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id) }
    console.log(id, details)
    db.collection('posts').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'})
      } else {
        res.send(item)
      }
    })
  })

  // get all route
  app.get('/posts', (req, res) => {
    console.log('finding posts')
    db.collection('posts').find({}).toArray(function(err, posts) {
      if (err) {
        res.send({'error': 'An error has occurred'})
      } else {
        res.send(posts)
        }
    })
  })

  //update route
  app.put('/posts/:id', (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id) }
    const post = {
        content: req.body.content,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    }
    db.collection('posts').update(details, note, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'})
      } else {
        res.send(post)
      }
    })
  })

  //delete route
  app.delete('/posts/:id', (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id) }
    db.collection('posts').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'})
      } else {
        res.send('Note ' + id + ' deleted!')
      }
    })
  })

  // post route
  app.post('/posts', (req, res) => {
    const post = {
      content: req.body.content,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date
    }
    db.collection('posts').insertOne(post, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' })
      } else {
        res.send(result.ops[0])
      }
    })
  })
}
