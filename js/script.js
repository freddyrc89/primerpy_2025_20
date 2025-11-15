// Datos mock simulados
const usuariosMock = [
  { usuario: "juan", password: "1234" },
  { usuario: "maria", password: "abcd" },
  { usuario: "admin", password: "admin" }
];

// Detectar en qué página estamos
const paginaActual = window.location.pathname.split("/").pop();

// ---- LOGIN ----
if (paginaActual === "hola.html") {
  const formulario = document.getElementById("loginForm");

  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault(); // Evita que se envíe el formulario

    const usuarioIngresado = formulario.usuario.value;
    const passwordIngresado = formulario.password.value;

    const usuarioValido = usuariosMock.find(u =>
      u.usuario === usuarioIngresado && u.password === passwordIngresado
    );

    if (usuarioValido) {
      // Redirigir a ventana.html
      window.location.href = "ventana.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });
}

// ---- VENTANA PRINCIPAL ----
if (paginaActual === "ventana.html") {
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", () => {
    // Redirigir al login
    window.location.href = "hola.html";
  });
}
