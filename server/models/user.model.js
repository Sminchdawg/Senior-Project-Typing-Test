const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'Full name cannot be empty'
  },
  email: {
    type: String,
    required: 'Email cannot be empty',
    unique: true
  },
  password: {
    type: String,
    required: 'Password cannot be empty',
    minlength: [4, 'Password must be at least 4 characters long']
  },
  saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
  emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.')

// Events
userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(this.password, salt, (error, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

// Methods
userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function() {
  return jwt.sign({ _id: this._id }, 
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP,
    });
}

mongoose.model('User', userSchema);
