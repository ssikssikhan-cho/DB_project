const express = require('express');
const db = require('../db');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/available/:classroomId', (req, res) => {
  const classroomId = req.params.classroomId;
  const query = 'SELECT reservation_time FROM reservation WHERE classroom_id = ?';

  db.query(query, [classroomId], (err, results) => {
    if (err) return res.status(500).send('서버 오류');

    const allTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
    const reservedTimes = results.map((result) => result.reservation_time);
    const availableTimes = allTimes.filter((time) => !reservedTimes.includes(time));

    res.json(availableTimes);
  });
});

router.post('/', (req, res) => {
  const { classroom_id, reservation_time, duration } = req.body;
  const user_id = req.user.id;
  const query = 'INSERT INTO reservation (user_id, classroom_id, reservation_time, duration) VALUES (?, ?, ?, ?)';

  db.query(query, [user_id, classroom_id, reservation_time, duration], (err, results) => {
    if (err) return res.status(500).send('서버 오류');
    res.status(201).send('예약이 성공적으로 생성되었습니다.');
  });
});

module.exports = router;
