const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

router.post('/login', (req, res) => {
  const { name, password } = req.body;

  // 데이터베이스에서 사용자 확인
  const query = 'SELECT * FROM user WHERE name = ? AND password = ?';
  db.query(query, [name, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: '서버 오류' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: '잘못된 로그인 정보' });
    }

    // 사용자 정보와 JWT 생성
    const user = results[0];
    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  });
});

module.exports = router;


