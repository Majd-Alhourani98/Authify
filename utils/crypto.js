const crypto = require('crypto');

const generateSecureOTP = () => {
  const otp = crypto.randomInt(0, 1_000_000).toString().padStart(6, '0');

  return otp;
};
