var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define the schema for our user model
var userSchema = mongoose.Schema({

  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  }

});

// Methods generating password hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// Create the users model and expose it to our app
module.exports = mongoose.model('User', userSchema);
