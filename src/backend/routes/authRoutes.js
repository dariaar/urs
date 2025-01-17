const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Import povezivanja s bazom

const router = express.Router();

// Ruta za prijavu
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Provjeri da li je email unesen
  if (!email || !password) {
    return res.status(400).send('Molimo unesite email i lozinku');
  }

  // Provjeri postoji li korisnik u bazi
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      return res.status(500).send('Greška pri pristupu bazi podataka');
    }

    if (result.length === 0) {
      return res.status(400).send('Korisnik s tim emailom ne postoji');
    }

    const user = result[0];

    // Provjeri lozinku
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Greška pri provjeri lozinke');
      }

      if (!isMatch) {
        return res.status(400).send('Pogrešna lozinka');
      }

      // Generiraj JWT token
      const token = jwt.sign({ id: user.id }, 'tajni_kljuc', { expiresIn: '1h' });

      // Pošaljite token korisniku
      res.json({ token });
    });
  });
});

module.exports = router;
