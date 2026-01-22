const { customAlphabet } = require('nanoid');

const ALPHANUMERIC_CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateAlphanumeric = customAlphabet(ALPHANUMERIC_CHARSET, 6);

const createShortId = () => {
  return generateAlphanumeric();
};

module.exports = { createShortId };
