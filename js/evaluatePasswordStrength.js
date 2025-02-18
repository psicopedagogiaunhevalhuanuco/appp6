// evaluatePasswordStrength.js
export function evaluatePasswordStrength(password) {
    let score = 0;

    // Longitud mínima
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Caracteres especiales
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    // Números
    if (/\d/.test(password)) score += 1;

    // Mayúsculas y minúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;

    // Actualizar indicador de fortaleza
    const passwordStrengthMeter = document.getElementById('passwordStrengthMeter');
    const strengthText = document.getElementById('strengthText');
    passwordStrengthMeter.className = 'password-strength-meter';


    if (score <= 2) {
        passwordStrengthMeter.classList.add('weak');
        strengthText.textContent = 'Débil';
    } else if (score <= 3) {
        passwordStrengthMeter.classList.add('medium');
        strengthText.textContent = 'Media';
    } else if (score <= 4) {
        passwordStrengthMeter.classList.add('strong');
        strengthText.textContent = 'Fuerte';
    } else {
        passwordStrengthMeter.classList.add('very-strong');
        strengthText.textContent = 'Muy fuerte';
    }

    return score;
}