const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

router.post('/login', (req, res) => {
  const { studentId, password } = req.body;

  const query = 'SELECT * FROM user WHERE user_id = ? AND password = ?';
  db.query(query, [studentId, password], (err, results) => {
    if (err) return res.status(500).send('서버 오류');
    if (results.length === 0) return res.status(401).send('잘못된 로그인입니다.');

    const user = results[0];
    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;

