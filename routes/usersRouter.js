const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect('/');
})

module.exports = router;