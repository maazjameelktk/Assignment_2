const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // leave empty if default
  database: 'ecommerce'
});

connection.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// ✅ Route to get all products
app.get('/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
