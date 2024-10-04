const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

app.use(express.json());

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
