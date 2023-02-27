import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    req.shhhh_secret = 'dont tell'
    next()
    // res.status(401)
    // res.send('Nope')
})

app.get('/', (req, res) => {
    console.log('get /')
    res.status(200);
    res.json({
        message: 'hello'
    })
})

app.use('/api', router)

export default app;