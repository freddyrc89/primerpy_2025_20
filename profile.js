(function(){
    function setText(id, value){
        const el = document.getElementById(id);
        if(el) el.textContent = value || '-';
    }

    function setValue(id, value){
        const el = document.getElementById(id);
        if(el) el.value = value || '';
    }

    let user = null;
    try{
        const raw = localStorage.getItem('primerpy_user');
        if(raw) user = JSON.parse(raw);
    }catch(e){
        console.warn('No se pudo leer usuario de localStorage', e);
    }

    if(user){
        setText('displayName', user.name);
        setText('displayEmail', user.email);
        setText('displayBirth', user.birth);

        // Prefill edit form
        setValue('editName', user.name);
        setValue('editBirth', user.birth);
        // Ocultar enlace de registrar si ya hay usuario
        try{
            const regLink = document.querySelector('a[href="register.html"]');
            if(regLink) regLink.style.display = 'none';

            // Añadir botón Cerrar sesión junto a Inicio
            const actions = document.querySelector('.header .actions');
            if(actions){
                const logout = document.createElement('a');
                logout.className = 'button';
                logout.href = '#';
                logout.textContent = 'Cerrar sesión';
                logout.style.marginLeft = '8px';
                logout.addEventListener('click', function(e){
                    e.preventDefault();
                    try{ localStorage.removeItem('primerpy_user'); }catch(err){}
                    // opcional: redirigir a register o inicio
                    window.location.href = 'register.html';
                });
                actions.appendChild(logout);
            }
        }catch(e){ console.warn(e); }
    }else{
        setText('displayName', 'Invitado');
        setText('displayEmail', 'No registrado');
        setText('displayBirth', '-');
    }

    // Manejo básico del formulario de edición: actualizar localStorage y actualizar vista
    const editForm = document.getElementById('editForm');
    if(editForm){
        editForm.addEventListener('submit', function(e){
            e.preventDefault();
            const newName = (document.getElementById('editName')||{}).value || '';
            const newBirth = (document.getElementById('editBirth')||{}).value || '';
            if(!newName){ alert('El nombre no puede quedar vacío.'); return; }
            const updated = { name: newName.trim(), email: (user&&user.email)||'', birth: newBirth };
            try{ localStorage.setItem('primerpy_user', JSON.stringify(updated)); }catch(err){ console.warn(err); }
            // Actualizar vista
            setText('displayName', updated.name);
            setText('displayBirth', updated.birth);
            alert('Perfil actualizado (simulado).');
        });
    }
})();
