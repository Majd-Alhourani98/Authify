const catchAsync = require('../errors/catchAsync');
const User = require('../models/user.model');
const sendEmail = require('../utils/email');
const { ConflictError } = require('../errors/AppError');

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const existingUser = await User.findOne({ email }).select('_id').lean();
  if (existingUser) return next(new ConflictError('Email already is use'));

  const user = new User({ name, email, password, passwordConfirm });

  const otp = user.generateEmailVerificationOTP();

  try {
    await sendEmail({
      to: user.email,
      subject: 'Verify your email',
      text: `Your OTP for email verification is: ${otp} `,
    });
  } catch (err) {
    user.emailVerificationOTP = undefined;
    user.emailVerificationOTPExpiresAt = undefined;
  } finally {
    await user.save();
  }

  return res.status(201).json({
    status: 'success',
    data: { user: user },
    otp,
  });
});

module.exports = { signup };
