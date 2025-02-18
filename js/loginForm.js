// loginForm.js
import { sanitizeInput } from './sanitizeInput.js';
import { validateEmail } from './validateEmail.js';
import { validatePassword } from './validatePassword.js';
import { evaluatePasswordStrength } from './evaluatePasswordStrength.js';
import { lockForm } from './lockForm.js';
import { showAlert } from './showAlert.js';
import { credentials } from './config.prod.js';

// Contador de intentos fallidos
let failedAttempts = 0;
let isLocked = false;

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const submitBtn = document.getElementById('submitBtn');

    // Manejo del evento input para contraseña
    passwordInput.addEventListener('input', function() {
        const password = sanitizeInput(this.value);
        evaluatePasswordStrength(password);
    });

    // Manejo del envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Si el formulario está bloqueado, no procesar
        if (isLocked) return;

        // Obtener y sanitizar valores
        const email = sanitizeInput(emailInput.value);
        const password = sanitizeInput(passwordInput.value);

        // Validar campos
        const isEmailValid = validateEmail(email);
        const passwordErrors = validatePassword(password);

        if (!isEmailValid) {
            emailError.textContent = 'Por favor, ingresa un correo electrónico válido';
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }

        if (passwordErrors.length > 0) {
            passwordError.textContent = passwordErrors.join(', ');
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }

        if (isEmailValid && passwordErrors.length === 0) {
            // Simulación de autenticación (en un caso real, esto sería una llamada a la API)
            if (email === credentials.email && password === credentials.password) {
                showAlert('Inicio de sesión exitoso. Redirigiendo...', 'success');
                console.log('EMAIL:', credentials.email);
                console.log('PASSWORD:', credentials.password);

                // Simulación de redirección
                setTimeout(() => {
                    alert.style.display = 'none';
                    loginForm.reset();
                    document.getElementById('passwordStrengthMeter').className = 'password-strength-meter';
                    document.getElementById('strengthText').textContent = '';
                }, 2000);
            } else {
                failedAttempts++;

                if (failedAttempts >= 3) {
                    // Bloquear por 30 segundos después de 3 intentos
                    lockForm(30);
                    failedAttempts = 0;
                } else {
                    showAlert(`Credenciales incorrectas. Intentos restantes: ${3 - failedAttempts}`, 'danger');
                }
            }
        }
    });
});