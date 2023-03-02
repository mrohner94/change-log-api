import prisma from '../modules/db'
import { hashPassword, createJWT, comparePasswords } from '../modules/auth'

export const createNewUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })
    
        const token = createJWT(user)
        res.json({ token })
    } catch(e) {
        e.type = 'input'
        next(e)
    }
}

export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    const validPassword = await comparePasswords(req.body.password, user.password)

    if(validPassword) {
        res.status(200)
        res.json({
            jwt: createJWT(user)
        })
    } else {
        res.status(401)
        res.json({
            message: "Not Authorized"
        })
    }
}