// validatePassword.js
export function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];
    if (password.length < minLength) errors.push('La contraseña debe tener al menos 8 caracteres');
    if (!hasUpperCase) errors.push('Debe incluir al menos una mayúscula');
    if (!hasLowerCase) errors.push('Debe incluir al menos una minúscula');
    if (!hasNumbers) errors.push('Debe incluir al menos un número');
    if (!hasSpecialChar) errors.push('Debe incluir al menos un carácter especial');
    return errors;
}