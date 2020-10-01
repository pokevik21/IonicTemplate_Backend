/*
    Ruta: /api/uploads/
*/

const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { fileUpload, getArch } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');




const router = Router();

router.use(expressFileUpload());


router.put('/:tabla/:id', [
        validarJWT
    ],
    fileUpload);


router.get('/:tabla/:arch', [
        // validarJWT
    ],
    getArch);


module.exports = router;