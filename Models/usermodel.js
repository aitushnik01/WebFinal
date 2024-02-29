const db = require('../Databases/dbSql');
const bcrypt = require('bcryptjs');

const User = {
    findByEmail: async (email) => {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('Error finding user by email');
        }
    },
    create: async (user) => {
        try {
            const { username, email, password, role } = user;
            const hashedPassword = await bcrypt.hash(password, 10); // Hash password

            const [result] = await db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, role]);
            return result.insertId;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    }
};

module.exports = User;
