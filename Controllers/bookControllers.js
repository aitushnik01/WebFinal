const db = require('../Databases/dbSql')
const { validationResult } = require('express-validator')
const validation = require('../Utils/validation')
const { sendEmailNotification } = require('../Services/emailService')
const { checkManagerRole, checkAdminRole } = require('./authMiddleware');


const bookController = {
    getAllBooks: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM books')
            res.json(rows)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error fetching books' })
        }
    },

    addBook: async (req, res) => {
        try {
            await validation.validateBook(req)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const newBook = req.body
            await db.query('INSERT INTO books SET ?', newBook)
            sendEmailNotification(newBook)
            res.json({ message: 'Book added successfully' })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error adding book' })
        }
    },

    updateBook: async (req, res) => {
        try {
            await validation.validateBook(req)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const bookId = req.params.id
            const updatedBook = req.body
            const [result] = await db.query('UPDATE books SET ? WHERE id = ?', [
                updatedBook,
                bookId,
            ])

            if (result.affectedRows > 0) {
                res.json({ message: 'Book updated successfully' })
            } else {
                res.status(404).json({ message: 'Book not found' })
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error updating book' })
        }
    },

    deleteBook: async (req, res) => {
        try {
            const bookId = req.params.id
            const [result] = await db.query('DELETE FROM books WHERE id = ?', bookId)

            if (result.affectedRows > 0) {
                res.json({ message: 'Book deleted successfully' })
            } else {
                res.status(404).json({ message: 'Book not found' })
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error deleting book' })
        }
    },

    getBooksByAuthor: async (req, res) => {
        try {
            const authorId = req.params.id
            const query = `
                SELECT books.*, authors.name AS author_name
                FROM books
                LEFT JOIN authors ON books.author_id = authors.id
                WHERE authors.id = ?
            `
            const [rows] = await db.query(query, [authorId])

            res.json({
                message: 'Books by author retrieved successfully',
                books: rows,
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error fetching books by author' })
        }
    },

    getBooksByGenre: async (req, res) => {
        try {
            const genreId = req.params.id
            const query = `
                SELECT books.*, genres.name AS genre_name
                FROM books
                LEFT JOIN genres ON books.genre_id = genres.id
                WHERE genres.id = ?
            `
            const [rows] = await db.query(query, [genreId])

            res.json({
                message: 'Books by genre retrieved successfully',
                books: rows,
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error fetching books by genre' })
        }
    },
    module.exports = bookController
    addBook: async (req, res) => {
        try {
            // Only Managers and Admins can add books
            if (req.user.role !== 'Manager' && req.user.role !== 'Admin') {
                return res.status(403).json({ message: 'Unauthorized' });
            }
            // Add book logic
            // ...
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding book' });
        }
    },

    updateBook: async (req, res) => {
        try {
            // Only Managers and Admins can update books
            if (req.user.role !== 'Manager' && req.user.role !== 'Admin') {
                return res.status(403).json({ message: 'Unauthorized' });
            }
            // Update book logic
            // ...
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating book' });
        }
    },

    deleteBook: async (req, res) => {
        try {
            // Only Admins can delete books
            if (req.user.role !== 'Admin') {
                return res.status(403).json({ message: 'Unauthorized' });
            }
            // Delete book logic
            // ...
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting book' });
        }
    },
};


module.exports = bookController;


