const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '192.168.1.122',   // ili IP adresa servera
  user: 'root',        // korisničko ime
  password: '',        // lozinka
  database: 'students' // ime tvoje baze podataka
});

db.connect((err) => {
  if (err) {
    console.error('Greška pri povezivanju s bazom:', err);
    return;
  }
  console.log('Uspješno povezano s bazom podataka');
});

module.exports = db;
