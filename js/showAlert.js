// showAlert.js
export function showAlert(message, type) {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.className = `alert alert-${type}`;
    alert.style.display = 'block';

    // Oculta la alerta después de 5 segundos
    setTimeout(() => {
        alert.style.display = 'none';
    }, 5000);
}