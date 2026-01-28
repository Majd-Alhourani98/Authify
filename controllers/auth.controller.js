const catchAsync = require('../errors/catchAsync');
const User = require('../models/user.model');

const signup = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = new User({ name, email, password, passwordConfirm });

  const otp = user.generateEmailVerificationOTP();

  await user.save();

  return res.status(201).json({
    status: 'success',
    data: { user: user },
    otp,
  });
});

module.exports = { signup };
