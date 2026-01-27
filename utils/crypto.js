const crypto = require('crypto');

const hashValue = value => {
  return crypto.createHash('sha256').update(value).digest('hex');
};

const generateSecureOTP = () => {
  const otp = crypto.randomInt(0, 1_000_000).toString().padStart(6, '0');
  const hashedOTP = hashValue(otp);
  const otpExpires = new Date(Date.now() + 15 * 60 * 1000);
  return { otp, hashedOTP, otpExpires };
};

console.log(generateSecureOTP());
