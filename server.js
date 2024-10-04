
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

app.use(express.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@admin.com' && password === 'admin') {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: 'Credenciales incorrectas' });
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token requerido' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
};

app.get('/weather', authenticateToken, async (req, res) => {
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

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
