// login.js - Funcionalidad específica para login

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            
            if (!email.value || !password.value) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            // Simular inicio de sesión exitoso
            alert('¡Inicio de sesión exitoso!');
            form.reset();
        });
    }
});