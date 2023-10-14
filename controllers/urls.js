const Url = require('../models/Url');
const generateRandomString = require('../middleware/randomString');

const createShortUrl = async (req, res) => {
  const { customName, originalUrl } = req.body;
  let shortUrls;

  try {
    if (customName) {
      const customNameWithDashes = customName.split(' ').join('-');
      shortUrls = `https://shortit/${customNameWithDashes}`;
      const existingCustomName = await Url.findOne({ customName: customNameWithDashes });
      if (existingCustomName) {
        return res.status(400).json({ errors: 'Custom name already exists' });
      }
    } else {
      const randomString = generateRandomString(5);
      shortUrls = `https://shortit/${randomString}`;
    }

    const existingRandomString = await Url.findOne({ shortUrl: shortUrls });
    if (existingRandomString) {
      return res.status(400).json({ error: 'This string already exists' });
    }
    const existingLongUrl = await Url.findOne({ originalUrl });
    if (existingLongUrl) {
      res.status(200).json({ shortUrl: shortUrls });
    }
    const url = await Url.create({
      ...req.body,
      shortUrl: shortUrls,
      customName
    });
    res.status(200).json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
};

const customShortUrl = async (req, res) => {
  res.send('custom name for short url');
};

module.exports = {
  createShortUrl,
  customShortUrl
};
