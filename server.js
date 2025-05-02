const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // Para formularios HTML tradicionales
app.use(bodyParser.json()); // Para datos JSON

// Define la ruta al archivo de la base de datos SQLite
const dbPath = path.join(__dirname, 'reservations.db');

// Función para crear la tabla de reservas si no existe
function crearTablaReservas(db) {
    db.run(`
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            pedido TEXT NOT NULL,
            
        )
    `, (err) => {
        if (err) {
            console.error('Error al crear la tabla de reservas:', err.message);
        } else {
            console.log('Tabla "reservations" creada o ya existente.');
        }
    });
}

// Abre la conexión a la base de datos SQLite al iniciar el servidor
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        crearTablaReservas(db);
    }
});

app.post('/api/reservations', (req, res) => {
    const { date, time, name, email, pedido } = req.body;
    const errors = {};

    if (!date) {
        errors.date = 'La fecha es requerida.';
    }
    if (!time) {
        errors.time = 'La hora es requerida.';
    }
    if (!pedido || pedido.trim() === '') {
        errors.pedido = 'El pedido es requerido.';
    }
    if (!name || name.trim() === '') {
        errors.name = 'El nombre es requerido.';
    }
    if (!email || email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'El email debe ser válido.';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    const sql = `INSERT INTO reservations (date, time, people, name, email) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [date, time, name, email, pedido], function(err) {
        if (err) {
            console.error('Error al insertar la reserva:', err.message);
            return res.status(500).json({ message: 'Error al guardar la reserva en la base de datos.' });
        }
        console.log(`Reserva insertada con ID: ${this.lastID}`);
        return res.status(201).json({ message: 'Reserva realizada con éxito!', reservationId: this.lastID });
    });
});

app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});

// Cierra la conexión a la base de datos al finalizar el proceso
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Cerrando la conexión a la base de datos SQLite.');
        process.exit(0);
    });
});
