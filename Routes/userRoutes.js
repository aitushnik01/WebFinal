const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../Controllers/userControllers');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key'; // Change this to your actual secret key

// Register a new user
router.post('/register', [
    check('username').isLength({ min: 3 }),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
], userController.register);

// Login
router.post('/login', async (req, res) => {
    try {
        // Call the login controller function
        const user = await userController.login(req, res);

        // If login is successful, generate JWT token
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

        // Set token in cookies
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration

        // Return success response with token
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Generate OTP for a specific user
router.post('/generate-otp/:userId', userController.generateOTPForUser);

// Recover password with OTP
router.post('/recover-password', userController.recoverPasswordWithOTP);

module.exports = router;
