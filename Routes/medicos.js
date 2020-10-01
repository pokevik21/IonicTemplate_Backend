/*
    Ruta: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');


const {
    getMedicos,
    getMedicosById,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');

const router = Router();


router.get('/', validarJWT, getMedicos);

router.get('/:id', validarJWT, getMedicosById);

router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre es necesario').notEmpty(),
        check('hospital', 'El hospital no es valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);


router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es necesario').notEmpty(),
        check('hospital', 'El hospital no es valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico);

router.delete('/:id', validarJWT, borrarMedico);


module.exports = router;