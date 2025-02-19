// Código específico para la página de intervención
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