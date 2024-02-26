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

// Recover password by Email

router.post('/reset-password/request', [
    check('email').isEmail(),
], userController.requestPasswordReset);

// Reset password
router.post('/reset-password', userController.resetPassword);

// VK authentication and 2FA routes
router.get('/vk/auth', userController.vkAuth);
router.get('/vk/auth/callback', userController.vkCallback);
router.post('/vk/enable-2fa/:userId', userController.enableVK2FA);
router.post('/vk/recover-password', userController.recoverPasswordWithVK);

module.exports = router;