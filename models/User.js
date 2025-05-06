const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  telegramId: { type: String, required: true },
  botId: { type: String, required: true },
  company: { type: String },
  name: { type: String },
  street: { type: String },
  postalCode: { type: String },
  city: { type: String },
  country: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

