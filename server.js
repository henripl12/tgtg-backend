const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB-Verbindung
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("❌ MongoDB URI nicht gefunden. Bitte überprüfen Sie die .env-Datei.");
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB verbunden'))
  .catch(err => console.log('❌ MongoDB Fehler:', err));

// Testroute
app.get('/', (req, res) => {
  res.send('TGTG Backend läuft ✅');
});

// Server starten
app.listen(PORT, () => {
  console.log(`🟢 Server läuft auf http://localhost:${PORT}`);
});


const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

