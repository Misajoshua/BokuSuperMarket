const express = require('express');
const router = express.Router();

//import the product controller
const productController = require('../Controllers/ProductController');

//define the routes for product creation and update
router.post('/createproduct', productController.createProduct);

router.put('/updateproduct/:id', productController.updateProduct);

//export the router to used in other files
module.exports = router;  