const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../server/middlewares/authMiddleware');

router.get('/available/:classroomId', authMiddleware, (req, res) => {
  const classroomId = req.params.classroomId;
  const query = 'SELECT reservation_time FROM reservation WHERE classroom_id = ?';

  db.query(query, [classroomId], (err, results) => {
    if (err) return res.status(500).send('서버 오류');

    const allTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
    const reservedTimes = results.map(result => result.reservation_time);
    const availableTimes = allTimes.filter(time => !reservedTimes.includes(time));

    res.json(availableTimes);
  });
});

router.post('/reservations', authMiddleware, (req, res) => {
  const { classroomId, reservationTimes } = req.body;

  reservationTimes.forEach(time => {
    const insertQuery = 'INSERT INTO reservation (user_id, classroom_id, reservation_time) VALUES (?, ?, ?)';
    db.query(insertQuery, [req.user.id, classroomId, time], (err) => {
      if (err) return res.status(500).send('서버 오류');
    });
  });

  res.send('예약이 완료되었습니다.');
});

module.exports = router;
