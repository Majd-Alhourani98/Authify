const catchAsync = require('../errors/catchAsync');
const User = require('../models/user.model');

const signup = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.create({ name, email, password, passwordConfirm });

  const otp = user.generateEmailVerificationOTP();
  await user.save({ validateBeforeSave: false });

  return res.status(201).json({
    status: 'success',
    data: { user: user },
    otp,
  });
});

module.exports = { signup };
