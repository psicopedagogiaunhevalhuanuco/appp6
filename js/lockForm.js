// lockForm.js
export function lockForm(seconds) {
    const submitBtn = document.getElementById('submitBtn');
    let isLocked = true;
    submitBtn.disabled = true;

    const alert = document.getElementById('alert');
    alert.textContent = `Demasiados intentos fallidos. Por favor, espera ${seconds} segundos antes de intentar nuevamente.`;
    alert.className = 'alert alert-danger';
    alert.style.display = 'block';

    // Iniciar temporizador para desbloquear
    let remainingTime = seconds;
    submitBtn.textContent = `Espera ${remainingTime} segundos`;

    const lockTimer = setInterval(() => {
        remainingTime--;
        submitBtn.textContent = `Espera ${remainingTime} segundos`;

        if (remainingTime <= 0) {
            clearInterval(lockTimer);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Iniciar Sesión';
            isLocked = false;
        }
    }, 1000);
}