/*
    Ruta: /api/todo/:busqueda
*/

const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');



const {
    getBusqueda,
    getDocumentoColeccion
} = require('../controllers/buscador');

const router = Router();


router.get('/:busqueda', [
        validarJWT
    ],
    getBusqueda);

router.get('/coleccion/:tabla/:busqueda', [
        validarJWT
    ],
    getDocumentoColeccion);



module.exports = router;