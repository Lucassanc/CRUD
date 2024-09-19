let area = document.getElementById("descripcion");
area.style.resize = "none";
//Oculto el menu despues de seleccionar
function seleccionar(){
    document.getElementById("nav").classList ="";
}
class Tarea {
    constructor(titulo, descripcion, fechaInicio, fechaLimite, tareaRealizada) {
        this.id = null;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaLimite = fechaLimite;
        this.tareaRealizada = tareaRealizada;
    }
}
function agregarTarea() {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const fechaInicio = new Date();
    const fechaLimite = new Date();
    const tareaRealizada = document.getElementById("tareaRealizada").checked;
    const tarea = new Tarea(titulo, descripcion, fechaInicio, fechaLimite, tareaRealizada);
    fetch('http://localhost:3000/api/tareas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Tarea agregada:', data);
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetchTasks();
});
function fetchTasks() {
    fetch('http://localhost:3000/api/tareas')
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks);
        })
        .catch(error => console.error('Error fetching tasks:', error));
}
function displayTasks(tasks) {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
        // Create a container for each task
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        // Create title element
        const titleElement = document.createElement('h3');
        titleElement.textContent = task.titulo;
        titleElement.addEventListener('click', () => toggleDetails(taskElement));
        // Create details element
        const detailsElement = document.createElement('div');
        detailsElement.className = 'task-details';
        detailsElement.style.display = 'none';
        detailsElement.innerHTML = `
            <span class="overlay">
            <p><strong>Descripción:</strong> ${task.descripcion}</p>
            <p><strong>Fecha de Inicio:</strong> ${new Date(task.fechaInicio).toLocaleDateString()}</p>
            <p><strong>Fecha Límite:</strong> ${new Date(task.fechaLimite).toLocaleDateString()}</p>
            <p><strong>Realizada:</strong> ${task.tareaRealizada ? 'Sí' : 'No'}</p>
            <button class="edit-button" onclick="editarTarea(${task.id})">Editar</button>
            <button class="delete-button" onclick="borrarTarea(${task.id})">Eliminar</button>
            </span>
        `;
        //Append title, edit button, and details to the task container
        taskElement.appendChild(titleElement);
        taskElement.appendChild(detailsElement);
        tasksContainer.appendChild(taskElement);
    });
}
//Mostrar detalles de la tarea al hacer clic en el título
function toggleDetails(taskElement) {
    const detailsElement = taskElement.querySelector('.task-details');
    detailsElement.style.display = (detailsElement.style.display === 'none' || detailsElement.style.display === '') ? 'block' : 'none';
}
//Ocultar el formulario de actualización
function ocultarFormularioActualizar() {
    document.getElementById('actualizar').style.display = 'none';
}
function editarTarea(tareaId) {
    fetch(`http://localhost:3000/api/tareas/${tareaId}`)
        .then(response => response.json())
        .then(task => {
            if(document.getElementById('actualizar').style.display == 'none'){
                document.getElementById("tareaId").value = task.id;
                document.getElementById("tituloActualizar").value = task.titulo;
                document.getElementById("descripcionActualizar").value = task.descripcion;
                document.getElementById("fechaLimiteActualizar").value = new Date(task.fechaLimite).toISOString().split('T')[0];
                document.getElementById("tareaRealizadaActualizar").checked = task.tareaRealizada;
                document.getElementById('actualizar').style.display = 'block';
            }else{
                ocultarFormularioActualizar();
            }
        })
        .catch(error => console.error('Error fetching task for update:', error));
}
function actualizarTarea() {
    event.preventDefault();
    const tareaId = document.getElementById("tareaId").value;
    const titulo = document.getElementById("tituloActualizar").value;
    const descripcion = document.getElementById("descripcionActualizar").value;
    const fechaLimite = new Date(document.getElementById("fechaLimiteActualizar").value);
    const tareaRealizada = document.getElementById("tareaRealizadaActualizar").checked;
    const tareaActualizada = {
        titulo: titulo,
        descripcion: descripcion,
        fechaLimite: fechaLimite,
        tareaRealizada: tareaRealizada
    };
    fetch(`http://localhost:3000/api/tareas/${tareaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tareaActualizada)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Tarea actualizada:', data);
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function borrarTarea(tareaId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
        fetch(`http://localhost:3000/api/tareas/${tareaId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Tarea eliminada');
                window.location.reload();
            } else {
                console.error('Error al eliminar la tarea');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}