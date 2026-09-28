// const user = require('../Models/Users');

// //create a user
// exports.createUser = async (req, res) => {
//     try {
//         //request body
//          const { name, email, password, gender, phone, role } = req.body;

//         //check if all required fields are provided
//         if (!req.body.name || !req.body.email || !req.body.password || !req.body.gender || !req.body.phone || !req.body.role) {
//             return res.status(400).json({ message: 'Please provide all required fields' });
//         }
        
//         //check if the email already exists in the database
//         const existingUser = await Product.findOne({ email: req.body.email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already exists' });
//         }

//         //check if phone numberalready exists in the database
//         const existingPhone = await Product.findOne({ phone: req.body.phone });
//         if (existingPhone) {
//             return res.status(400).json({ message: 'Phone number already exists' });
//         }

//         //encrypt the password before saving to the database
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//          //create a new user
       
//         const user = new User({ 
//             name: req.body.name, 
//             email: req.body.email, 
//             password: hashedPassword, 
//             gender: req.body.gender, 
//             phone: req.body.phone, 
//             role: req.body.role || 'user', //Default role is 'user' if not provided
//             hasAdminAccess: req.body.hasAdminAccess || false //Default is false if not provided
//         }); 

//         //save the user to the database
//         await user.save();

//         res.status(201).json({ message: 'User created successfully', user });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user', error: error.message });
//     }
// };

// //login user
// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         //check if the email and password are provided
//         if (!email || !password) {
//             return res.status(400).json({ message: 'Please provide email and password' });
//         }

//         //check if the user exists in the database
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         //check if the password is correct
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         //generate a token for the user
//         const jwt = require('jsonwebtoken');
//         const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ message: 'Login successful', token, user });
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in user', error: error.message });
//     }
// };

const User = require('../Models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, gender, phone, role } = req.body;

        if (!name || !email || !password || !gender || !phone || !role) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            gender,
            phone,
            role: req.body.role || 'user', // Default role is 'user' if not provided
            hasAdminAccess: req.body.hasAdminAccess || false
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
  
        const jwt = require('jsonwebtoken');
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name, role: user.role, hasAdminAccess: user.hasAdminAccess },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token, role: user.role, hasAdminAccess: user.hasAdminAccess });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};