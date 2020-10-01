// const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const HopitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' });

HopitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Hospital', HopitalSchema);