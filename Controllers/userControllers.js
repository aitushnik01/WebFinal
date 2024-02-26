const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../Models/userModel');
const { generateOTP } = require('../Middlewares/authMiddleware');
const passport = require('passport'); // Add Passport.js for authentication
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const VK_APP_ID = '51865114';
const VK_APP_SECRET = 'vkvtMtcVeGR9rVsvJQXF';

passport.use(new VKontakteStrategy({
        clientID: VK_APP_ID,
        clientSecret: VK_APP_SECRET,
        callbackURL: "https://c52e-185-13-23-79.ngrok-free.app/vk/auth/callback",
    },
    (accessToken, refreshToken, params, profile, done) => {
        // Check user profile and store user information in your database
        // Call done() with user details
    }));


const userController = {
    register: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;

            // Check if user with the same email already exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user
            const userId = await User.create({ username, email, password: hashedPassword, role });

            res.status(201).json({ message: 'User registered successfully', userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error registering user' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Verify password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Create and send JWT token
            const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error logging in' });
        }
    },

    generateOTPForUser: async (req, res) => {
        try {
            const { userId } = req.params;

            // Check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate and update OTP for the user
            const otp = generateOTP();
            await User.updateOTP(userId, otp);

            res.json({ message: 'OTP generated successfully', otp });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error generating OTP' });
        }
    },

    recoverPasswordWithOTP: async (req, res) => {
        try {
            const { email, otp, newPassword } = req.body;

            // Check if the user exists and OTP matches
            const user = await User.findByEmail(email);
            if (!user || user.otp !== otp) {
                return res.status(401).json({ message: 'Invalid email or OTP' });
            }

            // Update the password and generate a new OTP
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.updatePasswordAndOTP(user.id, hashedPassword, generateOTP());

            res.json({ message: 'Password recovered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error recovering password' });
        }
    },

    vkAuth: passport.authenticate('vkontakte'),

    // VK callback after authentication
    vkCallback: passport.authenticate('vkontakte', { failureRedirect: '/' }),
    enableVK2FA: async (req, res) => {
        try {
            const { userId } = req.params;

            // Check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Enable VK 2FA for the user
            // Store VK authentication details in your database

            res.json({ message: 'VK 2FA enabled successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error enabling VK 2FA' });
        }
    },

    // Recover password with VK 2FA
    recoverPasswordWithVK: async (req, res) => {
        try {
            const { vkAuthCode, newPassword } = req.body;

            // Validate VK authentication code and recover password

            res.json({ message: 'Password recovered with VK 2FA successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error recovering password with VK 2FA' });
        }
    },
    requestPasswordReset: async (req, res) => {
        try {
            const { email } = req.body;

            // Check if the user exists
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate a reset token
            const resetToken = generateUniqueToken();

            // Update the user with the reset token
            await User.updateResetToken(user.id, resetToken);

            // Send a password reset email with the reset link
            await sendPasswordResetEmail(email, resetToken);

            res.json({ message: 'Password reset email sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error requesting password reset' });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { resetToken, newPassword } = req.body;

            // Find the user by reset token
            const user = await User.findByResetToken(resetToken);
            if (!user) {
                return res.status(401).json({ message: 'Invalid reset token' });
            }

            // Update the password and clear the reset token
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.updatePasswordAndResetToken(user.id, hashedPassword, null);

            res.json({ message: 'Password reset successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error resetting password' });
        }
    },
};

module.exports = userController;