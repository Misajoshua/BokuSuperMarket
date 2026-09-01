const Product = require('../Models/Products');

// // Create a new product
// const createProduct = async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };


// module.exports = { createProduct };

exports.createProduct = async (req, res) => {
    try {

        //check if all required fields are provided
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.stock || !req.body.size || !req.body.quantity || !req.body.color) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const { name, description, price, stock, size, quantity, color } = req.body;
        const product = new Product({name, description, price, stock, size, quantity, color});

        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(400).json({ message: "Error creating product ", error: error.message });
    }
};

//Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params; //where id is the product id to be updated
        const { name, description, price, stock, size, quantity, color } = req.body;

        const product = await Product.findByIdAndUpdate(id, { name, description, price, stock, size, quantity, color }, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(400).json({ message: "Error updating product", error: error.message });
    }
};