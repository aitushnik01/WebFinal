const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Validation middleware to validate book data
const validateBook = () => {
    return [
        check('name').isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),
        check('author').isLength({ min: 1, max: 100 }).withMessage('Author must be between 1 and 100 characters'),
        check('publish_year').isInt({ min: 100, max: 2026 }).withMessage('Publish year must be between 100 and 2026'),
        check('pages_count').isInt({ min: 1, max: 13000 }).withMessage('Pages count must be between 1 and 13000'),
        check('price').isFloat({ min: 0, max: 15000 }).withMessage('Price must be between 0 and 15000'),
    ];
};

// Middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Log validation errors for debugging
        console.error('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Route to add a new book with validation middleware applied
router.post('/add', validateBook(), validate, (req, res) => {
    // Handle adding a new book
});

module.exports = router;
