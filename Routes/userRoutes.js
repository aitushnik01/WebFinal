const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../Controllers/userControllers');

// Register a new user
router.post('/register', [
    check('username').isLength({ min: 3 }),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
], userController.register);

// Login
router.post('/login', userController.login);

// Generate OTP for a specific user
router.post('/generate-otp/:userId', userController.generateOTPForUser);

// Recover password with OTP
router.post('/recover-password', userController.recoverPasswordWithOTP);

module.exports = router;