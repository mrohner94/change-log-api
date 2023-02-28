import jwt from 'jsonwebtoken'
import * as bcrypt from "bcrypt"

export const createJWT = (user): string => {
    const token = jwt.sign(
        {
            id: user.id, 
            username: user.username
        }, 
        process.env.JWT_SECRET
    )

    return token
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if(!bearer) {
        res.status(401)
        res.json(
            {
                message: "Not Authorized"
            }
        )
        return;
    }

    const [, token] = bearer.split(' ')

    if(!token) {
        res.status(401)
        res.json(
            {
                message: "Invalid Token"
            }
        )
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch(e) {
        console.error(e)
        res.status(401)
        res.json(
            {
                message: "Invalid Token"
            }
        )
    }
}

export const hashPassword = (password: string): string => {
    return bcrypt.hash(password, 5);
}

export const comparePasswords = (password: string, hash: string): boolean => {
    return bcrypt.compare(password, hash)
}