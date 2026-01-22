const User = require('../models/user.model');
const { createShortId } = require('../utils/nanoid');

const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const base = name.replace(/\s+/g, '-').toLowerCase();
    let username = `${base}_${createShortId()}`;

    const doc = await User.findOne({ username }).select('id').lean();

    while (doc) {
      doc = await User.findOne({ username }).select('id').lean();
    }

    const user = await User.create({ name, email, password, passwordConfirm, username });

    res.status(201).json({
      status: 'success',
      data: { user: user },
    });
  } catch (error) {
    res.status(200).json({
      status: 'fail',
      message: error.message,
    });
  }
};

module.exports = { signup };
