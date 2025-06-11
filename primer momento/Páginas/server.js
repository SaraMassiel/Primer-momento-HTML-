const express = require('express');
const ExcelJS = require('exceljs');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 3000;

// Función reutilizable para escribir en Excel
async function agregarAFicheroExcel(filePath, nombreHoja, columnas, datos) {
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    if (fs.existsSync(filePath)) {
        await workbook.xlsx.readFile(filePath);

        worksheet = workbook.getWorksheet(nombreHoja);
        
        // Si la hoja no existe (por nombre incorrecto), la creamos
        if (!worksheet) {
            worksheet = workbook.addWorksheet(nombreHoja);
            worksheet.columns = columnas;
        }
    } else {
        worksheet = workbook.addWorksheet(nombreHoja);
        worksheet.columns = columnas;
    }

    datos.FechaEnvio = new Date().toLocaleString();
    worksheet.addRow(datos);
    
    await workbook.xlsx.writeFile(filePath);
}

// Ruta para registrar datos personales
app.post('/registrar', async (req, res) => {
    try {
        const columnas = [
            { header: 'Tipo ID', key: 'tipoID' },
            { header: 'Número ID', key: 'numeroID' },
            { header: 'Primer Nombre', key: 'primerNombre' },
            { header: 'Segundo Nombre', key: 'segundoNombre' },
            { header: 'Primer Apellido', key: 'primerApellido' },
            { header: 'Segundo Apellido', key: 'segundoApellido' },
            { header: 'Fecha Nacimiento', key: 'fechaNacimiento' },
            { header: 'País', key: 'pais' },
            { header: 'Correo', key: 'correo' },
            { header: 'Teléfono', key: 'telefono' },
            { header: 'Contraseña', key: 'contrasena' },
            { header: 'Fecha de Envío', key: 'FechaEnvio' }
        ];

        await agregarAFicheroExcel('registro.xlsx', 'Registros', columnas, req.body);

        res.json({ message: "¡Registro exitoso y guardado en Excel! 📊🪐" });
    } catch (err) {
        console.error("Error en /registrar:", err);
        res.status(500).json({ message: "Error al guardar el registro." });
    }
});

// Ruta para cuestionario de salud
app.post('/cuestionario', async (req, res) => {
    console.log("Datos recibidos en cuestionario:", req.body);
    try {
        const columnas = [
            { header: 'Enfermedad Cardiovascular', key: 'EnfermedadCardiovascular' },
            { header: 'Fumador', key: 'Fumador' },
            { header: 'Salud Mental', key: 'SaludMental' },
            { header: 'Ejercicio', key: 'Ejercicio' },
            { header: 'Tolerancia al Aislamiento', key: 'ToleranciaAislamiento' },
            { header: 'Educación', key: 'Educacion' },
            { header: 'Otro (Educación)', key: 'OtroEducacion' },
            { header: 'Nivel de Inglés', key: 'NivelIngles' },
            { header: 'Motivación', key: 'Motivacion' },
            { header: 'Fecha de Envío', key: 'FechaEnvio' }
        ];

        await agregarAFicheroExcel('cuestionario_salud.xlsx', 'Cuestionario', columnas, req.body);

        res.json({ message: "¡Formulario guardado exitosamente en el servidor! 📄✅" });
    } catch (err) {
        console.error("Error en /cuestionario:", err);
        res.status(500).json({ message: "Error al guardar el cuestionario." });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});