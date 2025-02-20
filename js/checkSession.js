function checkUserSession() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.innerText = `Bienvenido, ${user.username}`;
        }
        loadUserContent(user.userType);
    } else {
        window.location.href = '../index.html'; // Ajusta la ruta según la ubicación del archivo
    }
}

function loadUserContent(userType) {
    const userContent = document.getElementById('userContent');
    if (userContent) {
        if (userType === 'admin') {
            userContent.innerHTML = '<p>Contenido exclusivo para administradores.</p>';
        } else {
            userContent.innerHTML = '<p>Contenido para usuarios regulares.</p>';
        }
    }
}

export { checkUserSession };