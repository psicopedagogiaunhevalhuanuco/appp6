// Variable para almacenar las intervenciones en memoria (en lugar de localStorage)
let intervencionesMem = [];

// Navegación entre secciones
document.querySelectorAll('nav li').forEach(item => {
    item.addEventListener('click', () => {
        // Remover clase active de todos los elementos
        document.querySelectorAll('nav li').forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
        
        // Agregar clase active al elemento seleccionado
        item.classList.add('active');
        
        // Mostrar la sección correspondiente
        const sectionId = item.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});

// Manejar el envío del formulario de intervención
document.getElementById('intervencion-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;
    const carrera = document.getElementById('carrera').value;
    const motivo = document.getElementById('motivo').value;
    
    // Crear una nueva intervención
    const nuevaIntervencion = {
        id: Date.now(),
        nombre,
        fecha,
        carrera,
        motivo,
        estado: 'En progreso'
    };
    
    // Guardar la intervención en la variable en memoria
    intervencionesMem.push(nuevaIntervencion);
    
    // Resetear el formulario
    this.reset();
    
    // Mostrar mensaje de éxito
    alert('Intervención iniciada con éxito');
    
    // Actualizar la lista de intervenciones
    actualizarListaIntervenciones();
});

// Función para actualizar la lista de intervenciones
function actualizarListaIntervenciones() {
    const container = document.getElementById('intervenciones-container');
    
    if (intervencionesMem.length === 0) {
        container.innerHTML = '<p>No hay intervenciones registradas.</p>';
        return;
    }
    
    let html = '';
    intervencionesMem.forEach(intervencion => {
        html += `
            <div class="card">
                <h3>${intervencion.nombre}</h3>
                <p><strong>Fecha:</strong> ${formatearFecha(intervencion.fecha)}</p>
                <p><strong>Carrera:</strong> ${intervencion.carrera}</p>
                <p><strong>Estado:</strong> ${intervencion.estado}</p>
                <button class="btn" onclick="verDetalles(${intervencion.id})">Ver detalles</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Función para formatear la fecha
function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Función para ver detalles de una intervención
function verDetalles(id) {
    const intervencion = intervencionesMem.find(i => i.id === id);
    
    if (intervencion) {
        alert(`
            Nombre: ${intervencion.nombre}
            Fecha: ${formatearFecha(intervencion.fecha)}
            Carrera: ${intervencion.carrera}
            Motivo: ${intervencion.motivo}
            Estado: ${intervencion.estado}
        `);
    }
}

// Script para manejar la subida de la imagen y redimensionarla
document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('profile-img');
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
        img.src = storedImage;
    } else {
        img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj4KICA8Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIgZmlsbD0iI2NjYyIgLz4KICA8cGF0aCBkPSJNMTIuNSAyNSBhMTIuNSAxMi41IDAgMSAxIDI1IDAgMTIuNSAxMi41IDAgMCAxLTI1IDB6bTAgMjVjLTcuNzUgMC0xNSAzLjg3LTE1IDUuNzV2Mi41aDMwdi0yLjVjMC0xLjg4LTcuMjUtNS43NS0xNS01Ljc1eiIgZmlsbD0iI2ZmZiIgLz4KPC9zdmc+Cg==';
    }

    document.getElementById('upload-img').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
                localStorage.setItem('profileImage', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});