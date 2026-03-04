const express = require('express');
const app = express();

// Ruta de prueba para verificar que el contenedor responde
app.get('/', (req, res) => {
    res.send('<h1>Servidor de Tránsito Sabaneta corriendo en Docker</h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});