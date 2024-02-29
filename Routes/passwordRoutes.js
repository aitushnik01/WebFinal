const express = require('express');
const router = express.Router();
const passwordController = require('../Controllers/passwordController');
const { checkAuthentication } = require('../Middlewares/authMiddleware'); // Import your authentication middleware

router.post('/request', checkAuthentication, passwordController.requestRecovery); // Protect with authentication middleware
router.post('/complete', checkAuthentication, passwordController.completeRecovery); // Protect with authentication middleware

module.exports = router;
