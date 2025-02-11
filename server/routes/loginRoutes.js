const express = require('express');
const { Login } = require('../controllers/loginController');


const router = express.Router();

// Route to handle user login
router.post('/login', Login);

module.exports = router;