const db = require('../Databases/dbSql');
const { validationResult } = require('express-validator');
const validation = require('../Utils/validation');
const { sendEmailNotification } = require('../Services/emailService');
const { checkManagerRole, checkAdminRole } = require('../Middlewares/authMiddleware.js');

const bookController = {
    getAllBooks: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM books');
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching books' });
        }
    },

    addBook: async (req, res) => {
        try {
            // Authorization - Only managers and admins can add books
            checkManagerRole(req, res, () => {
                const newBook = req.body;
                db.query('INSERT INTO books SET ?', newBook);
                sendEmailNotification(newBook);
                res.json({ message: 'Book added successfully' });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding book' });
        }
    },

    updateBook: async (req, res) => {
        try {
            // Authorization - Only managers and admins can update books
            checkManagerRole(req, res, async () => {
                // Validation
                validation.validateBook(req);
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                const bookId = req.params.id;
                const updatedBook = req.body;

                const [result] = await db.query('UPDATE books SET ? WHERE id = ?', [updatedBook, bookId]);

                if (result.affectedRows > 0) {
                    res.json({ message: 'Book updated successfully' });
                } else {
                    res.status(404).json({ message: 'Book not found' });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating book' });
        }
    },





    deleteBook: async (req, res) => {
        try {
            // Authorization - Only Admins can delete books
            checkAdminRole(req, res, async () => {
                const bookId = req.params.id;

                // Perform the logic to delete the book (update the following line accordingly)
                const result = await db.query('DELETE FROM books WHERE id = ?', [bookId]);

                if (result.affectedRows > 0) {
                    res.json({ message: 'Book deleted successfully' });
                } else {
                    res.status(200).json({ message: 'Book not found or already deleted' });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting book' });
        }
    },

};

module.exports = bookController;
