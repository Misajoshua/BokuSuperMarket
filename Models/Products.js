const mongose = require('mongoose');
const productSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    }, 
    quantity: {
        type: Number,
        required: true
    }, 
    color: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
    
},
{timestamps: true} //date created and updated at
);

//create model for schema
const Product = mongose.model('Product', productSchema);

module.exports = Product;  //export the model to use in other files