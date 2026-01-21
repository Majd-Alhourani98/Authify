const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedPasswordConfirm = await bcrypt.hash(passwordConfirm, 12);
    console.log(hashedPassword, hashedPasswordConfirm);

    const user = await User.create({ name, email, password: hashedPassword, passwordConfirm: hashedPasswordConfirm });

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
