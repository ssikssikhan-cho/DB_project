const express = require('express');
const db = require('../db');
const router = express.Router();

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

module.exports = router;
