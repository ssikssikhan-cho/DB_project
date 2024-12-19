const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/classrooms', (req, res) => {
  const query = 'SELECT * FROM classroom';

  db.query(query, (err, results) => {
    if (err) return res.status(500).send('서버 오류');
    res.json(results);
  });
});

module.exports = router;