// register.js - Funcionalidad específica para registro

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const password = document.getElementById('password');
            const password2 = document.getElementById('password2');
            
            if (password.value !== password2.value) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            if (password.value.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres');
                return;
            }
            
            // Simular registro exitoso
            alert('¡Registro exitoso!');
            form.reset();
        });
    }
});