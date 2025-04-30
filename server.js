const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

// Permite conexiones desde tu front-end
app.use(cors());
// Para entender JSON que viene desde fetch
app.use(express.json());

// Conexión a tu base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Emiliano',
    password: 'emi123',
    database: 'BBDD.sql' // el nombre que le diste a la base
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a MySQL');
    }
});

// Endpoint POST para recibir reservas
app.post('/api/reservas', (req, res) => {
    const { name, email, date, time, people } = req.body;

    if (!name || !email || !date || !time || !people) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    const sql = `INSERT INTO reservas (nombre, email, fecha, hora, personas)
                 VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [name, email, date, time, people], (err, result) => {
        if (err) {
            console.error('Error al insertar reserva:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(201).json({ success: true, id: result.insertId });
    });
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
