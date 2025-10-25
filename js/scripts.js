// scripts.js - Archivo JavaScript esencial para animaciones

// ===== AOS (Animate On Scroll) - Implementación básica =====
class SimpleAOS {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // Encontrar todos los elementos con data-aos
        this.elements = Array.from(document.querySelectorAll('[data-aos]'));
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(el => this.observer.observe(el));
    }

    animate(element) {
        const animation = element.getAttribute('data-aos');
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            
            switch(animation) {
                case 'fade-up':
                    element.style.transform = 'translateY(0)';
                    break;
                case 'fade-down':
                    element.style.transform = 'translateY(0)';
                    break;
                case 'fade-left':
                    element.style.transform = 'translateX(0)';
                    break;
                case 'fade-right':
                    element.style.transform = 'translateX(0)';
                    break;
                case 'zoom-in':
                    element.style.transform = 'scale(1)';
                    break;
                case 'zoom-out':
                    element.style.transform = 'scale(1)';
                    break;
            }
        }, 50);
    }
}

// ===== Funcionalidad para hola.html - Modal simple =====
const ModalManager = {
    init() {
        const modal = document.getElementById('modalEncuesta');
        const btn = document.getElementById('btnEncuesta');
        const cerrar = document.getElementById('cerrarModal');
        const form = document.getElementById('formEncuesta');
        
        if (btn && modal) {
            btn.addEventListener('click', () => {
                modal.style.display = 'block';
            });
        }
        
        if (cerrar && modal) {
            cerrar.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        if (modal) {
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('¡Gracias por completar la encuesta!');
                modal.style.display = 'none';
                form.reset();
            });
        }
    }
};

// ===== Inicialización cuando el DOM está listo =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS para animaciones
    new SimpleAOS();
    
    // Inicializar modal solo en hola.html
    if (window.location.pathname.includes('hola.html')) {
        ModalManager.init();
    }

    // Agregar estilos iniciales para elementos con data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        const animation = el.getAttribute('data-aos');
        switch(animation) {
            case 'fade-up':
                el.style.transform = 'translateY(30px)';
                break;
            case 'fade-down':
                el.style.transform = 'translateY(-30px)';
                break;
            case 'fade-left':
                el.style.transform = 'translateX(30px)';
                break;
            case 'fade-right':
                el.style.transform = 'translateX(-30px)';
                break;
            case 'zoom-in':
                el.style.transform = 'scale(0.9)';
                break;
            case 'zoom-out':
                el.style.transform = 'scale(1.1)';
                break;
        }
        el.style.opacity = '0';
    });
});