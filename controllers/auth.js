const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verfy');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'Error, email no existe.'
            });
        }

        // Verifica cantraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            res.status(400).json({
                ok: false,
                msg: 'Error, la contraseña no es valida.'
            });
        }

        //generar token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token, 
            menu: getMenuFrontEnd(usuarioDB.role)
        });

    } catch (error) {
        res.json({
            ok: false,
            msg: 'Error al login, cunsulta al adminestador.'
        });
    }

};

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            //sino existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        //generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Google token no valido.'
        });
    }



};

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    //generar token
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario, 
        menu: getMenuFrontEnd(usuario.role)
    });

};


module.exports = {
    login,
    googleSignIn,
    renewToken
};