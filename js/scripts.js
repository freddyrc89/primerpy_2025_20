// Script para hola.html - Funcionalidad del modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalEncuesta');
    const btn = document.getElementById('btnEncuesta');
    const cerrar = document.getElementById('cerrarModal');
    const form = document.getElementById('formEncuesta');
    
    if (btn && modal) {
        btn.onclick = () => modal.style.display = 'block';
    }
    
    if (cerrar && modal) {
        cerrar.onclick = () => modal.style.display = 'none';
    }
    
    if (modal) {
        window.onclick = (e) => {
            if (e.target == modal) modal.style.display = 'none';
        }
    }
    
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            alert("Gracias por llenar el formulario");
            if (modal) modal.style.display = 'none';
            form.reset();
        }
    }
});
