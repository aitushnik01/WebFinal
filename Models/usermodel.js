const db = require('../Databases/dbSql');

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    findById: async (userId) => {
        try {
            const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
            return user.length ? user[0] : null;
        } catch (error) {
            throw error;
        }
    },
    updateOTP: async (userId, otp) => {
        try {
            await db.query('UPDATE users SET otp = ? WHERE id = ?', [otp, userId]);
        } catch (error) {
            throw error;
        }
    },
    updatePasswordAndOTP: async (userId, hashedPassword, newOTP) => {
        try {
            await db.query('UPDATE users SET password = ?, otp = ? WHERE id = ?', [hashedPassword, newOTP, userId]);
        } catch (error) {
            throw error;
        }
    },
    create: async (user) => {
        const { username, email, password, role } = user;
        const [result] = await db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role]);
        return result.insertId;
    },
    updateResetToken: async (userId, resetToken) => {
        try {
            await db.query('UPDATE users SET reset_token = ? WHERE id = ?', [resetToken, userId]);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = User;