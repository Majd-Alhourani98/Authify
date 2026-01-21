const User = require('../models/user.model');

const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const user = await User.create({ name, email, password, passwordConfirm });

    user.password = undefined;

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
