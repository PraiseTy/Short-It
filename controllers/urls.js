const Url = require('../models/Url');
const generateRandomString = require('../middleware/randomString');
const { BASEURL, HTTP_ERRORS } = require('../constant');

const createShortUrl = async (req, res) => {
  const { customName, originalUrl } = req.body;
  let shortUrls;

  try {
    if (customName) {
      const customNameWithDashes = customName.split(' ').join('-');
      shortUrls = `${BASEURL}/${customNameWithDashes}`;
      const existingCustomName = await Url.findOne({ customName: customNameWithDashes });
      if (existingCustomName) {
        return res.status(HTTP_ERRORS.BAD_REQUEST).json({ errors: 'Custom name already exists' });
      }
    } else {
      const randomString = generateRandomString(5);
      shortUrls = `${BASEURL}/${randomString}`;
    }

    const existingRandomString = await Url.findOne({ shortUrl: shortUrls });
    if (existingRandomString) {
      return res.status(HTTP_ERRORS.BAD_REQUEST).json({ error: 'This string already exists' });
    }
    const existingLongUrl = await Url.findOne({ originalUrl });
    if (existingLongUrl) {
      return res.status(HTTP_ERRORS.OK).json({ shortUrl: shortUrls });
    }
    const url = await Url.create({
      ...req.body,
      shortUrl: shortUrls,
      customName
    });
    res.status(HTTP_ERRORS.OK).json(url);
  } catch (error) {
    console.error(error);
    res.status(HTTP_ERRORS.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error. Please try again later.' });
  }
};

const customShortUrl = async (req, res) => {
  res.send('custom name for short url');
};

module.exports = {
  createShortUrl,
  customShortUrl
};
