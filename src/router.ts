import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { getProducts, createProduct, getOneProduct, deleteProduct, updateProduct } from './handlers/product';
import { getOneUpdate, updateUpdate, getUpdates, createUpdate, deleteUpdate } from './handlers/update';

const router = Router()

// Product
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body("name").isString(), handleInputErrors, updateProduct)
router.post('/product', body("name").isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)

// Update
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id', 
    body('title').optional().isString(), 
    body('body').optional().isString(), 
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional().isString(), 
    handleInputErrors, 
    updateUpdate
)
router.post('/update', 
    body('title').exists().isString(), 
    body('body').exists().isString(), 
    body('productId').exists().isString(),
    handleInputErrors, 
    createUpdate
)
router.delete('/update/:id', deleteUpdate)
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