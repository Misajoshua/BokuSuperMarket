const express = require('express');
const router = express.Router();

//import the product controller
const UserController = require('../Controllers/UserController');

// Define the routes for user management
router.post('/createuser', UserController.createUser);
router.post('/loginuser', UserController.loginUser);

//export the router to be used in other files
module.exports = router;