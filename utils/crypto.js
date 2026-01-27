const crypto = require('crypto');

const OTP = {
  LENGTH: 6,
  TTL_MS: 15 * 60 * 1000,
};

const hashValue = value => {
  return crypto.createHash('sha256').update(value).digest('hex');
};

const getExpiryDate = ttlMs => {
  return new Date(Date.now() + ttlMs);
};

const generateSecureOTP = (length = OTP.LENGTH, expiryDurationsMs = OTP.TTL_MS) => {
  const otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
  const hashedOTP = hashValue(otp);
  const otpExpires = getExpiryDate(expiryDurationsMs);
  return { otp, hashedOTP, otpExpires };
};

module.exports = { generateSecureOTP, hashValue };
