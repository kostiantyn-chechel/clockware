const express = require('express');
const { authUser, generateToken } = require('../processing/auth');
const router = express.Router();

router.post('/', authUser, (req, res) => {
    res.send({
        login: req.body.login,
        token: generateToken(req.body.login),
    });
});

module.exports = router;