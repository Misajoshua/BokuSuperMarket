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

//create a new product with image upload
exports.createProductWithImage = async (req, res) => {
    try {
        //check if all required fields are provided
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.stock || !req.body.size || !req.body.quantity || !req.body.color) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const { name, description, price, stock, size, quantity, color } = req.body;
        const image = req.file.path; // Cloudinary image path

        const product = new Product({ name, description, price, stock, size, quantity, color, image });

        await product.save();
        return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        return res.status(400).json({ message: "Error creating product", error: error.message });
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

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product fetched successfully", product });
    } catch (error) {
        res.status(400).json({ message: "Error fetching product", error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(400).json({ message: "Error deleting product", error: error.message });
    }
};

// exports.getProductById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findById(id);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json({ message: "Product retrieved successfully", product });
//     } catch (error) {
//         res.status(400).json({ message: "Error retrieving product", error: error.message });
//     }
// };

// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json({ message: "Products retrieved successfully", products });
//     } catch (error) {
//         res.status(500).json({ message: "Error retrieving products", error: error.message });
//     }
// };
