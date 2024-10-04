const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

router.post('/', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@admin.com' && password === 'admin') {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: 'Credenciales incorrectas' });
});

module.exports = router;
