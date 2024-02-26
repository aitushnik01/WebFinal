const db = require('../Databases/dbSql');

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    create: async (user) => {
        const { username, email, password, role } = user;
        const [result] = await db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role]);
        return result.insertId;
    }
};

module.exports = User;