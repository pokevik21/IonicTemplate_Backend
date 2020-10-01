/*
    Ruta: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');



const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');

const router = Router();


router.get('/',
    getHospitales);


router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').notEmpty(),
        validarCampos
    ],
    crearHospital
);


router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').notEmpty(),
        validarCampos
    ],
    actualizarHospital);

router.delete('/:id', validarJWT, borrarHospital);



module.exports = router;