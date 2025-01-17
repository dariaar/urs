const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Za hashiranje lozinki
const admin = require('firebase-admin'); // Firebase admin SDK

// Inicijalizacija Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json'); // Put do Firebase ključa

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://qrcode-63444-default-rtdb.europe-west1.firebasedatabase.app" // URL Firebase baze
});

const db = admin.database(); // Realtime Database reference
const app = express();
app.use(express.json());
app.use(cors());

// Ruta za prijavu
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email i lozinka su obavezni!' });
  }

  try {
    // Dohvat korisničkih podataka iz Firebase Realtime Database
    const usersRef = db.ref('users');
    const snapshot = await usersRef.orderByChild('email').equalTo(email).once('value');

    if (!snapshot.exists()) {
      return res.status(401).json({ message: 'Neispravan email ili lozinka.' });
    }

    const userData = Object.values(snapshot.val())[0];

    // Provjera lozinke
    const isMatch = await bcrypt.compare(password, userData.password);
    if (isMatch) {
      res.status(200).json({ message: 'Prijava uspješna!', user: userData });
    } else {
      res.status(401).json({ message: 'Neispravan email ili lozinka.' });
    }
  } catch (error) {
    console.error('Greška pri prijavi:', error);
    res.status(500).json({ message: 'Greška na serveru.' });
  }
});

// Ruta za registraciju korisnika
app.post('/api/register', async (req, res) => {
  const { name, surname, email, password } = req.body;

  if (!name || !surname || !email || !password) {
    return res.status(400).json({ message: 'Svi podaci su obavezni!' });
  }

  try {
    // Dohvat korisničkih podataka kako bismo provjerili postoji li email
    const usersRef = db.ref('users');
    const snapshot = await usersRef.orderByChild('email').equalTo(email).once('value');

    if (snapshot.exists()) {
      return res.status(400).json({ message: 'Email je već registriran.' });
    }

    // Hashiranje lozinke prije pohrane
    const hashedPassword = await bcrypt.hash(password, 10);

    // Pohrana korisničkih podataka u Firebase Realtime Database
    const newUserRef = usersRef.push();
    await newUserRef.set({
      name,
      surname,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Korisnik uspješno registriran.' });
  } catch (error) {
    console.error('Greška pri registraciji:', error);
    res.status(500).json({ message: 'Greška na serveru.' });
  }
});

// Pokretanje servera
app.listen(5000, () => {
  console.log('Backend server radi na portu 5000');
});
