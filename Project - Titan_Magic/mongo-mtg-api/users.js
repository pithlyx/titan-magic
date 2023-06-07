const express = require('express');
const mongoose = require('mongoose');

// Connect to the MongoDB server
mongoose.connect('mongodb://10.0.3.112:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  collections: [String],
  decks: [String],
});

const User = mongoose.model('User', UserSchema);

const router = express.Router();

// Fetch all users in the specified database
router.get('/users', async (req, res) => {
  const dbName = req.params.db;

  try {
    const users = await User.find().select('-password').exec();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Fetch a specific user by ID in the specified database
router.get('/users/:id', async (req, res) => {
  const dbName = req.params.db;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select('-password').exec();
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create a new user in the specified database
router.post('/users/new', async (req, res) => {
  const dbName = req.params.db;
  const { username, password } = req.body;

  try {
    const user = new User({
      username,
      password,
      collections: [],
      decks: [],
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

const app = express();
app.use(express.json());

// Mount the router on the specified base path
app.use('/mongo/:db', router);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
