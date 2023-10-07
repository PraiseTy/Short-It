const express = require('express')

const getAllUrls = async(req, res) => {
    res.send('Get all Urls')
}

const getUrl = async(req, res) => {
    res.send('Get single url')
}

const createShortUrl = async(req, res) => {
    res.send('Short Url created')
}

const editUrl = async(req, res) => {
    res.send('Edit a url')
}

const deleteUrl= async(req, res) => {
    res.send('Delete a url')
}

const customShortUrl = async(req, res)  => {
    res.send('custom name for short url')
}

module.exports = {
    getAllUrls,
    getUrl,
    createShortUrl,
    editUrl,
    deleteUrl,
    customShortUrl,
}