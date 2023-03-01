import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { getProducts, createProduct } from './handlers/product';

const router = Router()

// Product
router.get('/product', getProducts)
router.get('/product/:id', () => {})
router.put('/product/:id', body("name").isString(), handleInputErrors, (req, res) => {
})
router.post('/product', body("name").isString(), handleInputErrors, createProduct)

router.delete('/product/:id', () => {})

// Update
router.get('/update', () => {})
router.get('/update/:id', () => {})
router.put('/update/:id', 
    body('title').optional().isString(), 
    body('body').optional().isString(), 
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional().isString(), 
    handleInputErrors, 
    () => {}
)
router.post('/update', 
    body('title').exists().isString(), 
    body('body').exists().isString(), 
    handleInputErrors, 
    () => {}
)
router.delete('/update/:id', () => {})
// Update Point
router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id', 
    body('name').optional().isString(), 
    body('description').optional().isString(),
    handleInputErrors,
    () => {}
)
router.post('/updatepoint', 
    body('name').exists().isString(), 
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    handleInputErrors,
    () => {}
)

router.delete('/updatepoint/:id', () => {})

export default router