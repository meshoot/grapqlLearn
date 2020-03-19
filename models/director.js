const mongose = require('mongoose');
const Schema = mongose.Schema;

const directorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongose.model('Director', directorSchema);