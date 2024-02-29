const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/bookControllers');
const { validateBook, validate } = require('../utils/validation');
const { checkManagerRole, checkAdminRole } = require('../Middlewares/authMiddleware'); // Import your authentication middleware

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /books/add:
 *   post:
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: New Book
 *             author: New Author
 *             publish_year: 2023
 *             pages_count: 250
 *             price: 24.99
 *     responses:
 *       201:
 *         description: Book added successfully
 */
router.post('/add', validateBook(), validate, checkManagerRole, bookController.addBook); // Protect with manager role

/**
 * @swagger
 * /books/{id}/update:
 *   put:
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Updated Book
 *             author: Updated Author
 *             publish_year: 2024
 *             pages_count: 300
 *             price: 29.99
 *     responses:
 *       200:
 *         description: Book updated successfully
 */
router.put('/:id/update', validateBook(), validate, checkManagerRole, bookController.updateBook); // Protect with manager role

/**
 * @swagger
 * /books/{id}/delete:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted successfully
 */
router.delete('/:id/delete', checkAdminRole, bookController.deleteBook); // Protect with admin role

/**
 * @swagger
 * /books/author/{id}/books:
 *   get:
 *     summary: Get books by author ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the author
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Books by author retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: Author Book 1
 *                 author: Author Name
 *                 publish_year: 2022
 *                 pages_count: 200
 *                 price: 19.99
 */
// router.get('/author/:id/books', bookController.getBooksByAuthor); // This route might not need authentication or authorization

/**
 * @swagger
 * /books/genre/{id}/books:
 *   get:
 *     summary: Get books by genre ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the genre
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Books by genre retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: Genre Book 1
 *                 author: Author Name
 *                 publish_year: 2022
 *                 pages_count: 200
 *                 price: 19.99
 */
// router.get('/genre/:id/books', bookController.getBooksByGenre); // This route might not need authentication or authorization

module.exports = router;
