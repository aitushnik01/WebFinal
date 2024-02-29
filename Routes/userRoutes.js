const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../Controllers/userControllers');
const { checkAuthentication } = require('../Middlewares/authMiddleware'); // Import your authentication middleware

// Register a new user
router.post('/register', [
    check('username').isLength({ min: 3 }),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
], userController.register);

// Login
router.post('/login', userController.login);

// Example of a protected route (requires authentication)
router.get('/profile', checkAuthentication, userController.getProfile); // Protect with authentication middleware

module.exports = router;
