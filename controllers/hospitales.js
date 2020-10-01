const { response } = require('express');
const Hospital = require('../models/hospital');


const getHospitales = async(req, res) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
};

const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });


    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospitalCreado: hospitalDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};

const actualizarHospital = async(req, res = response) => {

    const hid = req.params.id;
    const uid = req.uid;
    try {

        const hospitalDB = Hospital.findById(hid);
        if (!hospitalDB) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por Id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hid, cambiosHospital, { new: true });


        res.json({
            ok: true,
            hospital: hospitalActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};

const borrarHospital = async(req, res = response) => {

    try {

        const hid = req.params.id;
        const hospitalDB = Hospital.findById(hid);

        if (!hospitalDB) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por Id'
            });
        }

        await Hospital.findByIdAndDelete( hid );

        res.json({
            ok: true,
            msg: 'Hospital borrado ' ,
            HospitalId: hid 
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
};