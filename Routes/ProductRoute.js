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

//import authentication middleware
const { protect } = require('../Middleware/auth');

//import authorization middleware
const { authorize } = require('../Middleware/role');

const router = express.Router();

//import the product controller
const productController = require('../Controllers/ProductController');

router.post('/createproduct', protect, authorize('superadmin'), productController.createProduct);
router.post('/createproductwithimage', protect, productController.createProductWithImage);

router.get('/getallproducts', protect, productController.getAllProducts);
router.get('/getproduct/:id', productController.getProductById);
router.put('/updateproduct/:id', protect, authorize('storekeeper'), productController.updateProduct);
router.delete('/:id', protect, authorize('superadmin'), productController.deleteProduct);

module.exports = router;