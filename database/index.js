const mongoose = require('mongoose');

const dbConnect = mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function (err, res) {
    if (err) throw err;
    console.log('Conectado con éxito a la BD: ' + process.env.DB_NAME);
});

module.exports = dbConnect