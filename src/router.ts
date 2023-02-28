import { Router } from 'express'
import { body, validationResult } from 'express-validator'

const router = Router()

// Product
router.get('/product', (req, res) => {
    res.status(200)
    res.json(
        {
            message: "success"
        }
    )

})
router.get('/product/:id', () => {})
router.put('/product/:id', body("name").isString(), (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400)
        res.json({ errors: errors.array() })
    }
})
router.post('/product', body("name").isString(), (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400)
        res.json({ errors: errors.array() })
    }
})
router.delete('/product/:id', () => {})

// Update
router.get('/update', () => {})
router.get('/update/:id', () => {})
router.put('/update/:id', () => {})
router.post('/update', () => {})
router.delete('/update/:id', () => {})

// Update Point
router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id', () => {})
router.post('/updatepoint', () => {})
router.delete('/updatepoint/:id', () => {})

export default router