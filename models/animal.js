const { mongoose } = require('../db/connection');

const animalsSchema = new mongoose.Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

const Animal = mongoose.model('Animal', animalsSchema)

module.exports = Animal