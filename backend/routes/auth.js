const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Keep existing routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { userId: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      if (process.env.NODE_ENV === 'development') {
        res.redirect(`http://localhost:3000?token=${token}`);
      } else {
        res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
      }
    } catch (error) {
      res.redirect('/login?error=authentication_failed');
    }
  }
);

// Get current user profile
router.get('/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await req.user;
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        preferences: user.preferences
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile' });
    }
  }
);

// Update user preferences
router.put('/preferences',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      user.preferences = req.body.preferences;
      await user.save();
      res.json({ message: 'Preferences updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating preferences' });
    }
  }
);

// Keep existing verify-token endpoint
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