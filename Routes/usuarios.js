/*
    Ruta: /api/usuario
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_O_MismoUsuario } = require('../middleware/validar-jwt');

const {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} = require('../controllers/usuario');



const router = Router();

router.get('/', validarJWT, getUsuario);

router.post(
    '/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La password es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos

    ],
    crearUsuario
);

router.put('/:id', [
        validarJWT,
        validarADMIN_ROLE_O_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario);

router.delete('/:id', [validarJWT, validarADMIN_ROLE], borrarUsuario);

module.exports = router;