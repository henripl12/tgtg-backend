const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ➕ POST /api/users – neuen Nutzer anlegen
router.post('/users', async (req, res) => {
  const { email, telegramId, botId } = req.body;
  try {
    const user = new User({ email, telegramId, botId });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔍 GET /api/users/:id – Nutzer per ID abrufen
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Nutzer nicht gefunden' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔍 GET /api/subscription/:userId – Abo-Status abrufen
router.get('/subscription/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'Nutzer nicht gefunden' });
    res.json({ subscriptionStatus: user.subscriptionStatus });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔄 PUT /api/subscription/:userId – Abo-Status aktualisieren
router.put('/subscription/:userId', async (req, res) => {
  const { subscriptionStatus } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { subscriptionStatus },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'Nutzer nicht gefunden' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

