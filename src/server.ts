import express from 'express'

const app = express()

app.get('/', (req, res) => {
    console.log('get /')
    res.status(200);
    res.json({
        message: 'hello'
    })
})

export default app;