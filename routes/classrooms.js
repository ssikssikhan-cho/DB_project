const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  const query = 'SELECT * FROM classroom';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('서버 오류');
    res.json(results);
  });
});

module.exports = router;

