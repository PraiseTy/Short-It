const express = require('express');
const Url = require('../models/Url');
const { HTTP_ERRORS, BASEURL } = require('../constant');

const getAllUrls = async (req, res) => {
  try {
    const url = await Url.find();
    res.json(url);
  } catch (error) {
    res
      .status(HTTP_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong. Try again' });
  }
};

const getUrl = async (req, res) => {
  try {
    const { id: urlId } = req.params;
    const url = await Url.findOne({ _id: urlId });
    if (!url) {
      return res.status(HTTP_ERRORS.NOT_FOUND).json({ error: 'Url cannot be found. Try Again' });
    }
    res.json(url);
  } catch (error) {
    res
      .status(HTTP_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong. Try Again' });
  }
};

const editUrl = async (req, res) => {
  const { originalUrl, customName } = req.body;
  const { id } = req.params;
  const filter = { _id: id };
  let shortUrls;
  try {
    const url = await Url.findOne({ _id: id });

    if (!url) {
      return res.status(HTTP_ERRORS.NOT_FOUND).json({ error: 'Url cannot be found. Try Again' });
    }

    if (customName) {
      const customNameWithDashes = customName.split(' ').join('-');
      shortUrls = `${BASEURL}/${customNameWithDashes}`;
    }

    const updatedUrl = await Url.findOneAndUpdate(filter, {
      customName,
      shortUrl: shortUrls,
      originalUrl
    });

    res.status(HTTP_ERRORS.OK).json({
      message: 'Url updated successfully',
      data: { id, customName, originalUrl, shortUrl: shortUrls, createdAt: updatedUrl.createdAt }
    });
  } catch (error) {
    return res.status(HTTP_ERRORS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong. Try Again' });
  }
};

const deleteUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await Url.findOneAndRemove({ _id: id });

    if (!url) {
      return res
        .status(HTTP_ERRORS.NOT_FOUND)
        .json({ error: `No url found with id ${id}. Try again` });
    }

    res.json({ message: 'Url deleted successfully', data: { id, customName: url.customName, originalUrl: url.originalUrl, shortUrl: url.shortUrl, createdAt: url.createdAt } });
  } catch (error) {
    res.status(HTTP_ERRORS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong.Try again' });
  }
};

module.exports = {
  getAllUrls,
  getUrl,
  editUrl,
  deleteUrl
};
