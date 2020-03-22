const mongose = require('mongoose');
const Schema = mongose.Schema;

const movieSchema = new Schema({
    name: String,
    genre: String,
    directorId: String,
    watched: Boolean,
    rate: Boolean
});

module.exports = mongose.model('Movie', movieSchema);