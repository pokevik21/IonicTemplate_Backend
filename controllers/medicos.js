const { response } = require('express');
const Medico = require('../models/medico');
const Hostital = require('../models/hospital');


const getMedicos = async(req, res) => {

    try {

        const medicos = await Medico.find()
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medicos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};

const getMedicosById = async(req, res) => {

    const mid = req.params.id;

    try {

        const medico = await Medico.findById(mid)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medico
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Medico no encontrado'
        });
    }


};

const crearMedico = async(req, res = response) => {

    try {

        const uid = req.uid;
        const hospi = req.body.hospital;

        if (!Hostital.findOne({ hospi })) {
            res.status(404).json({
                ok: false,
                msg: 'El Hospital ingresado no existe...'
            });
        }

        const newMedico = new Medico({
            usuario: uid,
            ...req.body
        });

        const medicoDB = await newMedico.save();

        res.json({
            ok: true,
            medicoCreado: medicoDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, en crearMedico... revisar logs'
        });
    }


};

const actualizarMedico = async(req, res = response) => {

    const mid = req.params.id;

    try {

        const medicoDB = await Medico.findById(mid);
        if (!medicoDB) {
            res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado medico por id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: req.uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(mid, cambiosMedico, { new: true });


        res.json({
            ok: true,
            medicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};

const borrarMedico = async(req, res = response) => {

    const mid = req.params.id;

    try {

        const medicoDB = await Medico.findById(mid);
        if (!medicoDB) {
            res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado medico por id'
            });
        }

        await Medico.findByIdAndDelete(mid);

        res.json({
            ok: true,
            msg: 'Medico borrado'
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
    getMedicos,
    getMedicosById,
    crearMedico,
    actualizarMedico,
    borrarMedico
};