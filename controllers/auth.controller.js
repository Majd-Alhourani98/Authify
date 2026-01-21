const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const user = await User.create({ name, email, password, passwordConfirm });

    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedPasswordConfirm = await bcrypt.hash(passwordConfirm, 12);

    await new Promise(res => setInterval(res, 5000));

    user.password = hashedPassword;
    user.passwordConfirm = hashedPasswordConfirm;
    await user.save({ validateBeforeSave: false });

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
