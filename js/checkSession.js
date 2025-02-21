function checkUserSession() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('welcomeMessage').innerText = `Bienvenido, ${user.username}`;
        loadUserContent(user.userType);
    } else {
        window.location.href = '../index.html'; // Ajusta la ruta según la ubicación del archivo
    }
}

function loadUserContent(userType) {
    if (userType === 'admin') {
        // Mostrar elementos específicos para administradores
        document.getElementById('intervencion-form').style.display = 'block';
        document.getElementById('registro').style.display = 'block';
    } else {
        // Mostrar elementos específicos para usuarios regulares
        document.getElementById('intervencion-form').style.display = 'block';
        document.getElementById('registro').style.display = 'none';
    }
}

export { checkUserSession };