function mostrarCampoOtro(select) {
    const campo = document.getElementById("campoOtro");
    campo.style.display = (select.value === "Otro") ? "block" : "none";
}

async function validarDatos(event) {
    event.preventDefault();

    const datos = {
        EnfermedadCardiovascular: document.getElementById("Cardio").value,
        Fumador: document.getElementById("Fumador").value,
        SaludMental: document.getElementById("Psicologico").value,
        Ejercicio: document.getElementById("Ejercicio").value,
        ToleranciaAislamiento: document.getElementById("Aislamiento").value,
        Educacion: document.getElementById("Educacion").value,
        OtroEducacion: document.getElementById("OtroEducacion").value.trim(),
        NivelIngles: document.getElementById("Ingles").value,
        Motivacion: document.getElementById("Descripcion").value.trim()
    };

    if (datos.Educacion === "Otro" && datos.OtroEducacion === "") {
        alert("Por favor, especifica tu nivel educativo.");
        return false;
    }

    try {
        const response = await fetch("http://localhost:3000/cuestionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const resultado = await response.json();
        alert(resultado.message); // Muestra respuesta del servidor
    } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Ocurrió un error al enviar los datos. 😢");
    }

    return false;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", validarDatos);
});