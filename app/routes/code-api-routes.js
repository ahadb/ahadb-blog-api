let ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

    // get route
    app.get('/code/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        console.log(id, details)
        db.collection('code').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'})
            } else {
                res.send(item)
            }
        })
    })

    // get all route
    app.get('/code', (req, res) => {
        console.log('finding posts')
        db.collection('code').find({}).toArray(function(err, items) {
            if (err) {
                res.send({'error': 'An error has occurred'})
            } else {
                res.send(items)
            }
        })
    })

    //update route
    app.put('/code/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        const code = {
            title: req.body.title,
            date: req.body.date,
            description: req.body.description,
            gistId: req.body.gistId,
            preCodeSnippet: req.body.preCodeSnippet,
            postCodeSnippet: req.body.postCodeSnippet
        }
        db.collection('code').update(details, code, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'})
            } else {
                res.send(code)
            }
        })
    })

    //delete route
    app.delete('/code/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        db.collection('code').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'})
            } else {
                res.send('Note ' + id + ' deleted!')
            }
        })
    })

    // post route
    app.post('/code', (req, res) => {
        const code = {
            title: req.body.title,
            date: req.body.date,
            description: req.body.description,
            gistId: req.body.gistId,
            preCodeSnippet: req.body.preCodeSnippet,
            postCodeSnippet: req.body.postCodeSnippet
        }
        db.collection('code').insertOne(code, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' })
            } else {
                res.send(result.ops[0])
            }
        })
    })
}
