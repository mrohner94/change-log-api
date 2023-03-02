import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    setTimeout(() => {
        next(new Error('hello'))
    }, 1)
    // res.status(200);
    // res.json({
    //     message: 'hello'
    // })
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signIn)

app.use((err, req, res, next) => {
    if(err.type === 'auth') {
        res.status(401).json({message: 'unauthorized'})
    } else if (err.type === 'input') {
        res.status(400).json({message: 'invalid input'})
    } else {
        res.status(500).json({message: 'oops, thats on us'})
    }
})

export default app;