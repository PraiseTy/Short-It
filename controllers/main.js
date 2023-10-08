const express = require('express')
const Url = require('../models/Url'); // Use 'Url' instead of 'url'

const getAllUrls = async(req, res) => {
    const url = await Url.find()
    res.json(url)
}

const getUrl = async(req, res) => {
    const url = await Url.findOne()
    res.json(url)
}

const editUrl = async(req, res) => {
    const { originalUrl, customName, shortUrl } = req.body
    const { id } = req.params
    const filter = {_id: id}
    const url = await Url.findOneAndUpdate(filter, {originalUrl, customName, shortUrl}, {new: true})
    res.json(url)
}

const deleteUrl= async(req, res) => {
    const { id } = req.params
    const url = await Url.findOneAndRemove()
    res.json(url)
}



module.exports = {
    getAllUrls,
    getUrl,
    editUrl,
    deleteUrl,
}