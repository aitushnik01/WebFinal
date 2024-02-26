const express = require('express');
const passport = require('passport');
const vkController = require('../Controllers/vkControllers');

const router = express.Router();

// VK authentication route
router.get('/auth', passport.authenticate('vkontakte'));

// Callback route after VK authentication
router.get('/auth/callback',
    passport.authenticate('vkontakte', { failureRedirect: '/' }),
    (req, res) => {
        // Successful VK authentication, redirect or handle as needed
        res.redirect('/');
    });

module.exports = router;
