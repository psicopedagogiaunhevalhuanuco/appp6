// Código específico para la página de registro
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