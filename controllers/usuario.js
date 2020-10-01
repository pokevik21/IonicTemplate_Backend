const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuario = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario
        .find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments()

    ]);

    res.json({
        ok: true,
        usuarios,
        total: total
    });
};

const crearUsuario = async(req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }


        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //generar token
        const token = await generarJWT(usuario.id);

        // Guardar contraseña
        await usuario.save();


        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};

const actualizarUsuario = async(req, res = response) => {

    // TODO: validar token y comprobar si es el usuario correcto
    const uid = req.params.id;


    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            res.status(400).json({
                ok: false,
                msg: 'Error, el usuario no existe'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDb.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                res.status(400).json({
                    ok: false,
                    msg: 'Error, ese email ya existe'
                });
            }
        }

        if (!usuarioDb.google){
            campos.email = email;
        }else if ( usuarioDb.email !== email ){
            res.status(200).json({
                ok: false,
                msg: 'Usuarios de google no pueden actualizar su email'
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            res.status(400).json({
                ok: false,
                msg: 'Error, el usuario no existe'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, en borrarUsuario... revisar logs'
        });
    }


};

module.exports = {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};