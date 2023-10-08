const mongoose = require('mongoose')

const ShortenedURLSchema = new mongoose.Schema({
    customName: {
        type: String,
        unique: true,
        sparse: true,
    },
    shortUrl: {
        type: String,
        unique: true,
    },
    originalUrl: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expirationDate: {
        type: Date,
    }
})

module.exports = mongoose.model('Url', ShortenedURLSchema)