const catchAsync = require('../errors/catchAsync');
const User = require('../models/user.model');
const sendEmail = require('../utils/email');
const { ConflictError } = require('../errors/AppError');
const { hashValue } = require('../utils/crypto');
const { currentTime } = require('../utils/date');

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

const verifyEmail = catchAsync(async (req, res, next) => {
  const { otp, email } = req.body;

  if (!email || !otp) {
    return next(new BadRequestError('Please provide both email and OTP.'));
  }

  const hashedOTP = hashValue(otp);

  // 1. Find user with matching email, valid hash, and non-expired time
  const user = await User.findOne({
    email,
    emailVerificationOTP: hashedOTP,
    emailVerificationOTPExpiresAt: { $gte: currentTime() },
  });

  // 2. If no user found, the OTP is either wrong or expired
  if (!user) return next(new BadRequestError('OTP invalid or expires'));

  // 3. Mark as verified and cleanup security fields
  user.isEmailVerified = true;
  user.emailVerificationOTP = undefined;
  user.emailVerificationOTPExpiresAt = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully!',
    data: user,
  });
});

module.exports = { signup, verifyEmail };
