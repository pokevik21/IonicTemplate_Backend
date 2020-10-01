const { response } = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizarImagen');


const fileUpload = async(req, res = response) => {

    const tipo = req.params.tabla;
    const id = req.params.id;

    // Validar tipo
    const tiporValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiporValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuasio u hospital (tipo)'
        });
    }

    // Validar existencia de archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha encontrado fichero'
        });
    }

    //Procesar imagen...
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar extensión
    const extensionValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión valida'
        });
    }


    // Generar nombre de archivo
    const nombreArch = `${uuidv4()}.${extension}`;

    //Path para guardar el archivo
    const path = `./uploads/${tipo}/${nombreArch}`;


    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover archivo'
            });

        }

        // Actualizar base de datos
        actualizarImagen(tipo, id, nombreArch);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArch
        });

    });



};


const getArch = async(req, res = response) => {

    const tipo = req.params.tabla;
    const arch = req.params.arch;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${arch}`);

    // img por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {

        res.sendFile(path.join(__dirname, '../uploads/no-img.png'));
    }


};


module.exports = {
    fileUpload,
    getArch
};