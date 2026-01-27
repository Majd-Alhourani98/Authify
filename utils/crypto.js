const crypto = require('crypto');

const generateSecureOTP = () => {
  const otp = crypto.randomInt(0, 1_000_000).toString().padStart(6, '0');
  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
  const otpExpires = new Date(Date.now() + 15 * 60 * 1000);
  return { otp, hashedOTP, otpExpires };
};
