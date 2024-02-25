const express = require('express');
const router = express.Router();
const passwordController = require('../Controllers/passwordController');

router.post('/request', passwordController.requestRecovery);
router.post('/complete', passwordController.completeRecovery);

module.exports = router;
