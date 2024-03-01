const crypto = require('crypto');

// Generate a secure random buffer
const secretBuffer = crypto.randomBytes(32);

// Convert the buffer to a hex string
const SECRET_KEY = secretBuffer.toString('hex');

console.log('Generated Secret Key:', SECRET_KEY);
