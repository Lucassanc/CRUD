const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Array para almacenar tareas
let tareas = [];
let idCounter = 1;

// Función para cargar las tareas desde el archivo JSON
function cargarTareas() {
    try {
        const data = fs.readFileSync('tasks.json', 'utf-8');
        tareas = JSON.parse(data);
        console.log('Tareas cargadas desde el archivo.');
    } catch (error) {
        console.log('No se pudo cargar el archivo de tareas o está vacío.', error);
        tareas = [];
    }
}

// Función para guardar las tareas en el archivo JSON
function guardarTareas() {
    fs.writeFileSync('tasks.json', JSON.stringify(tareas, null, 2), 'utf-8');
    console.log('Tareas guardadas en el archivo.');
}

// Cargar tareas cuando el servidor se inicie
cargarTareas();

// Endpoint para obtener todas las tareas
app.get('/api/tareas', (req, res) => {
    res.json(tareas);
});

// Endpoint para agregar una tarea
app.post('/api/tareas', (req, res) => {
    const tarea = req.body;
    // Validar que la tarea tenga un título y una fecha límite
    if (!tarea.titulo || !tarea.fechaLimite) {
        return res.status(400).json({ error: 'Título y fecha límite son requeridos' });
    }
    // Asignar un ID a la tarea
    tarea.id = idCounter++;
    // Agregar la tarea al array
    tareas.push(tarea);

    // Guardar tareas en el archivo
    guardarTareas();

    res.status(201).json(tarea);
});

// Endpoint para obtener una tarea específica
app.get('/api/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
});

// Endpoint para actualizar una tarea
app.put('/api/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    const tareaActualizada = { ...tareas[index], ...req.body };
    tareas[index] = tareaActualizada;

    // Guardar tareas en el archivo
    guardarTareas();
    
    res.json(tareaActualizada);
});

// Endpoint para eliminar una tarea
app.delete('/api/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    tareas.splice(index, 1);

    // Guardar tareas en el archivo
    guardarTareas();

    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});