const User = require('../models/user.model');

const sanitizeUser = user => {
  // convert mongoose document into a plain object
  const sanitized = { ...user._doc };

  delete sanitized.password;

  return sanitized;
};

const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const user = await User.create({ name, email, password, passwordConfirm });

    const cleanUser = sanitizeUser(user);
    res.status(201).json({
      status: 'success',
      data: { user: cleanUser },
    });
  } catch (error) {
    res.status(200).json({
      status: 'fail',
      message: error.message,
    });
  }
};

module.exports = { signup };
