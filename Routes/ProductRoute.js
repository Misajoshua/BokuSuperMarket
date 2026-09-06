// const express = require('express');
// const router = express.Router();

// //import the product controller
// const productController = require('../Controllers/ProductController');

// //define the routes for product creation and update
// router.post('/createproduct', productController.createProduct);

// router.put('/updateproduct/:id', productController.updateProduct);

// //export the router to used in other files
// module.exports = router;  


// const {
//     createProduct,
//     updateProduct,
//     getAllProducts,
//     getProductById,
//     deleteProduct
// } = require('../Controllers/ProductController');

// router.post('/', createProduct);
// router.get('/', getAllProducts);
// router.get('/:id', getProductById);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

// module.exports = router;

const express = require('express');
const router = express.Router();

//import the product controller
const productController = require('../Controllers/ProductController');

router.post('/createproduct', productController.createProduct);
router.get('/getallproducts', productController.getAllProducts);
router.get('/getproduct/:id', productController.getProductById);
router.put('/updateproduct/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;