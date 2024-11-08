const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { userId: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // For development
      if (process.env.NODE_ENV === 'development') {
        res.redirect(`http://localhost:5001?token=${token}`);
      } else {
        // For production
        res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
      }
    } catch (error) {
      res.redirect('/auth-error');
    }
  }
);

// Test endpoint to verify token
router.get('/verify-token',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
      }
    });
  }
);

module.exports = router;