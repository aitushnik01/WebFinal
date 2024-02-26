const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../Models/userModel');
const { generateOTP } = require('../Middlewares/authMiddleware');
const userController = {
    register: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;

            // Check if user with the same email already exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user
            const userId = await User.create({ username, email, password: hashedPassword, role });

            res.status(201).json({ message: 'User registered successfully', userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error registering user' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Verify password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Create and send JWT token
            const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error logging in' });
        }
    },

    generateOTPForUser: async (req, res) => {
        try {
            const { userId } = req.params;

            // Check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate and update OTP for the user
            const otp = generateOTP();
            await User.updateOTP(userId, otp);

            res.json({ message: 'OTP generated successfully', otp });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error generating OTP' });
        }
    },

    recoverPasswordWithOTP: async (req, res) => {
        try {
            const { email, otp, newPassword } = req.body;

            // Check if the user exists and OTP matches
            const user = await User.findByEmail(email);
            if (!user || user.otp !== otp) {
                return res.status(401).json({ message: 'Invalid email or OTP' });
            }

            // Update the password and generate a new OTP
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.updatePasswordAndOTP(user.id, hashedPassword, generateOTP());

            res.json({ message: 'Password recovered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error recovering password' });
        }
    },
};

module.exports = userController;