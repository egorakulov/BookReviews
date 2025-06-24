/* 
User Model
  - name (String)
  - email (String)
  - password (String, hashed)
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
