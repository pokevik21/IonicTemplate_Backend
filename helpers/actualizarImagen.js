const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        // borrar la imagen antior
        fs.unlinkSync(path);
    }
};

const actualizarImagen = async(tipo, id, nombreArch) => {

    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreArch;
            await medico.save();
            return true;


        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No es un hospital por id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);

            hospital.img = nombreArch;
            await hospital.save();
            return true;

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArch;
            await usuario.save();
            return true;

        default:
            break;
    }

};


module.exports = {
    actualizarImagen
}