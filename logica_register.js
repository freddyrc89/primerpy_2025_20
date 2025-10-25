        // Lógica de registro en cliente
        (function(){
            const form = document.getElementById('registerForm');
            const feedback = document.createElement('div');
            feedback.id = 'formFeedback';
            feedback.setAttribute('role','alert');
            feedback.style.marginTop = '8px';
            feedback.style.fontSize = '13px';
            form.insertBefore(feedback, form.firstChild);

            // toggle mostrar contraseñas
            const toggle = document.createElement('label');
            toggle.style.display = 'block';
            toggle.style.fontSize = '13px';
            toggle.style.marginTop = '6px';
            toggle.innerHTML = '<input type="checkbox" id="togglePwd" style="margin-right:6px"> Mostrar contraseñas';
            form.appendChild(toggle);
            const toggleBox = document.getElementById('togglePwd');
            toggleBox.addEventListener('change', function(){
                const p1 = document.getElementById('password');
                const p2 = document.getElementById('password2');
                if(p1) p1.type = this.checked ? 'text' : 'password';
                if(p2) p2.type = this.checked ? 'text' : 'password';
            });

            function showError(msg){
                feedback.textContent = msg;
                feedback.style.color = '#b00020';
            }
            function showSuccess(msg){
                feedback.textContent = msg;
                feedback.style.color = 'green';
            }

            function getUsers(){
                try{
                    const raw = localStorage.getItem('primerpy_users');
                    return raw ? JSON.parse(raw) : [];
                }catch(e){ return []; }
            }

            function saveUser(user){
                const users = getUsers();
                users.push(user);
                localStorage.setItem('primerpy_users', JSON.stringify(users));
                // también marcar usuario actual
                localStorage.setItem('primerpy_user', JSON.stringify(user));
            }

            form.addEventListener('submit', function(e){
                e.preventDefault();
                feedback.textContent = '';

                const name = (document.getElementById('name')||{}).value.trim();
                const email = (document.getElementById('email')||{}).value.trim();
                const birth = (document.getElementById('birth')||{}).value || '';
                const password = (document.getElementById('password')||{}).value || '';
                const password2 = (document.getElementById('password2')||{}).value || '';

                // Validaciones
                if(!name){ showError('El nombre es obligatorio.'); return; }
                if(!email){ showError('El email es obligatorio.'); return; }
                // email simple regex
                const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
                if(!emailRe.test(email)){ showError('Introduce una dirección de correo válida.'); return; }
                if(!password){ showError('La contraseña es obligatoria.'); return; }
                if(password.length < 8){ showError('La contraseña debe tener al menos 8 caracteres.'); return; }
                if(password !== password2){ showError('Las contraseñas no coinciden.'); return; }

                // comprobar duplicado
                const users = getUsers();
                const exists = users.some(u => u.email && u.email.toLowerCase() === email.toLowerCase());
                if(exists){ showError('Ya existe una cuenta con ese correo.'); return; }

                // Crear user (no guardamos la contraseña en claro en la vista; para demo lo omitimos)
                const user = { name: name, email: email, birth: birth, createdAt: new Date().toISOString() };
                try{
                    saveUser(user);
                }catch(err){ showError('Error guardando usuario. Comprueba la consola.'); console.error(err); return; }

                showSuccess('Registro completado. Redirigiendo...');
                setTimeout(()=> window.location.href = 'profile.html', 800);
            });
        })();
