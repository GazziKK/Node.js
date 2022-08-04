import express from 'express';

const app = express()
const port = 8000

app.all('/hello', (req, res, next) => {
    console.log('All Works');
    next();
})


app.get('/hello', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send(
        `
            <h1>Hello</h1>
            <hr>
        `
        )
})

app.post('/hello', (req, res) => {
    res.send('Post hello')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
})