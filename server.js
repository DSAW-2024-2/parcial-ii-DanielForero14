const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/login', require('./api/login'));
app.use('/api/clima', require('./api/clima'));

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
