/*
All the services a user can do, and can be done on a user
  - Create new user
  - Login
  - Find user by email
*/

const User = require('../models/user');

function hashPassword(password){
    let h = 0;
    for (let i = 0; i < password.length; i++) {
        h = 31 * h + password.charCodeAt(i);
    }
    return h & 0xFFFFFFFF;
}

async function createUser(name, email, password) {
    const hashedPassword= hashPassword(password);
    const user = new User( {name, email, password: hashedPassword.toString()});
    await user.save();
    return user;
}

async function login(email, password) {
    const hashedPassword = hashPassword(password).toString();
    const user = await User.findOne({ email });
    // case when there is no user associated with this email
    if (!user) return false;
    // case when there is a user with this email and password is correct
    if (user.email == email && user.password == hashedPassword) {
        return true;
    }
    // there is a user with this email, password is wrong
    return false;
}

async function getUserByEmail(email) {
    return User.findOne({ email });
}

module.exports = { createUser, login, getUserByEmail, hashPassword };