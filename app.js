const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/databaseConfig');
const app = express();
const ProductRoute = require('./Routes/ProductRoute');
const UserRoute = require('./Routes/UserRoute');

dotenv.config(); //load environment variables from .env file
connectDB(); //connect to MongDB

app.use(express.json()); //middleware to parse JSON request body

app.use('/Products', ProductRoute); //use the product routes for any requests to /products
app.use('/Users', UserRoute); //use the user routes for any requests to /users

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});