let ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

    // get route
    app.get('/links/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        console.log(id, details)
        db.collection('links').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'})
            } else {
                res.send(item)
            }
        })
    })

    // get all route
    app.get('/links', (req, res) => {
        console.log('finding posts')
        db.collection('links').find({}).toArray(function(err, posts) {
            if (err) {
                res.send({'error': 'An error has occurred'})
            } else {
                res.send(posts)
            }
        })
    })

    //update route
    app.put('/links/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        const link = {
            title: req.body.title,
            date: req.body.date,
            blockquote: req.body.blockquote,
            preSnippet: req.body.preSnippet,
            postSnippet: req.body.postSnippet,
            externalUrl: req.body.externalUrl
        }
        db.collection('links').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'})
            } else {
                res.send(link)
            }
        })
    })

    //delete route
    app.delete('/links/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        db.collection('links').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'})
            } else {
                res.send('Note ' + id + ' deleted!')
            }
        })
    })

    // post route
    app.post('/links', (req, res) => {
        const link = {
            title: req.body.title,
            date: req.body.date,
            blockquote: req.body.blockquote,
            preSnippet: req.body.preSnippet,
            postSnippet: req.body.postSnippet,
            externalUrl: req.body.externalUrl
        }
        db.collection('links').insertOne(link, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' })
            } else {
                res.send(result.ops[0])
            }
        })
    })
}
