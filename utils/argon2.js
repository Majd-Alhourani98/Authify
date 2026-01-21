const argon2 = require('argon2');

const hashPassword = async value => {
  return await argon2.hash(value, {
    memoryCost: 65536, // 64 MB
    timeCost: 3, // 3 iterations
    parallelism: 4, // 4 threads
    type: argon2.argon2id, // Recommended hybrid type
  });
};

module.exports = { hashPassword };
