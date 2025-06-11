document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", validarFormulario);
});

function validarFormulario(event) {
    event.preventDefault(); // Evita que recargue la página

    const data = {
        tipoID: document.getElementById("tipoID").value,
        numeroID: document.getElementById("numeroID").value,
        primerNombre: document.getElementById("primerNombre").value,
        segundoNombre: document.getElementById("segundoNombre").value,
        primerApellido: document.getElementById("primerApellido").value,
        segundoApellido: document.getElementById("segundoApellido").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        pais: document.getElementById("pais").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        contrasena: document.getElementById("contrasena").value
    };

    // Validaciones
    if (!/^\d{10}$/.test(data.numeroID)) {
        alert("El número de identificación debe tener 10 dígitos numéricos.");
        return;
    }

    if (!/^\d{10}$/.test(data.telefono)) {
        alert("El número de teléfono debe tener 10 dígitos numéricos.");
        return;
    }

    // Envío al backend
    fetch('http://localhost:3000/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // <- Aquí estaba mal antes
    })
    .then(res => res.json())
    .then(respuesta => {
        alert(respuesta.mensaje || '¡Registro exitoso!');
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        alert('Ocurrió un error.');
    });
}