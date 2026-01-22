const mongoose = require('mongoose');
const { hashPassword } = require('../utils/argon2');
const { createShortId } = require('../utils/nanoid');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [50, 'Name must be less than 50 characters'],
    },

    username: {
      type: String,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (value) {
          return value === this.password;
        },

        message: 'Passwords do not match',
      },
    },
  },
  {
    // timestamps: true
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;

    return ret;
  },
});

// Pre-save middleware to hash password
userSchema.pre('save', async function () {
  // Only hash if password was modified or is new
  if (!this.isModified('password')) return;

  // Check if password exists before hashing
  if (!this.password) return next();

  this.password = await hashPassword(this.password);

  this.passwordConfirm = undefined;
});

// Pre-save middleware to generate Username
userSchema.pre('save', async function () {
  const base = this.name.replace(/\s+/g, '-').toLowerCase();
  let username = `${base}_${createShortId()}`;

  const doc = await User.findOne({ username }).select('id').lean();

  while (doc) {
    doc = await User.findOne({ username }).select('id').lean();
  }

  this.username = username;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
