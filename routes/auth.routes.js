const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express();

router.route('/signup').post(authController.signup);

module.exports = router;
