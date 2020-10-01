const mongoose = require('mongoose');



const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs...');
    }

    console.log('DB online');

};

module.exports = {
    dbConnection
};