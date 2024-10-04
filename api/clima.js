const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token requerido' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
};

router.get('/', authenticateToken, async (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) return res.status(400).json({ message: 'Faltan coordenadas' });

    try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
            params: { latitude, longitude, current_weather: true }
        });
        const temperature = response.data.current_weather.temperature;
        res.json({ temperature });
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar el clima' });
    }
});

module.exports = router;
