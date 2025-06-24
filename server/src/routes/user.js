/* 
Connecting the routes to the functions defined in services/user.ts
*/

const express = require('express')
const { createUser, login, getUserByEmail } = require('../services/user');

const router = express.Router();

// route to create new user
router.post('/', async(req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await createUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// route to login user
router.get('/:email/:password', async (req, res) => {
  const { email, password } = req.params;
  try {
    const loggedIn = await login(email, password);
    if (loggedIn) {
      res.status(200).json(loggedIn);
    } else {
      res.status(401).json({error: "Incorrect username or password"});
    }
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});

// route to get user by email
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const name = await getUserByEmail(email);
    if (name) {
      res.status(200).json(name);
    } else {
      res.status(404).json({ error: "User not found"});
    }
  } catch (error) {
    console.log("ERROR ", error.message);
    res.status(400).json({ error: error.message});
  }
})

module.exports = router;