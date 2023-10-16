const express = require('express');
const Url = require('../models/Url');
const { HTTP_ERRORS } = require('../constant');

const getAllUrls = async (req, res) => {
  try {
    const url = await Url.find({});
    res.json(url);
  } catch (error) {
    res.status(HTTP_ERRORS.NOT_FOUND).json({ error: 'Something went wrong. Try again' });
  }
};

const getUrl = async (req, res) => {
  try {
    const { id: urlId } = req.params;
    const url = await Url.findOne({ _id: urlId });
    res.json(url);
  } catch (error) {
    res.status(HTTP_ERRORS.NOT_FOUND).json({ error: 'Url cannot be found. Try Again' });
  }
};

const editUrl = async (req, res) => {
  const { originalUrl, customName, shortUrl } = req.body;
  const { id } = req.params;
  const filter = { _id: id };
  const url = await Url.findOneAndUpdate(
    filter,
    { originalUrl, customName, shortUrl },
    { new: true }
  );
  res.json(url);
};

const deleteUrl = async (req, res) => {
  const { id } = req.params;
  const url = await Url.findOneAndRemove();
  res.json(url);
};

module.exports = {
  getAllUrls,
  getUrl,
  editUrl,
  deleteUrl
};
