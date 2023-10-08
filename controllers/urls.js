const express = require('express')
const Url = require('../models/Url')

const createShortUrl = async(req, res) => {
    const url = await Url.create({...req.body})
    res.json(url)
}

const customShortUrl = async(req, res)  => {
    res.send('custom name for short url')
}

module.exports = {
    createShortUrl,
    customShortUrl
}