const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// 하드코딩된 강의실 데이터
const classrooms = [
  { classroom_id: 1, location: 'T101', capacity: 100 },
  { classroom_id: 2, location: 'T102', capacity: 100 },
  { classroom_id: 3, location: 'T103', capacity: 100 },
  { classroom_id: 4, location: 'T501', capacity: 100 },
  { classroom_id: 5, location: 'T502', capacity: 100 },
  { classroom_id: 6, location: 'T503', capacity: 100 },
  { classroom_id: 7, location: 'T601', capacity: 60 },
  { classroom_id: 8, location: 'T602', capacity: 60 },
  { classroom_id: 9, location: 'T603', capacity: 60 },
  { classroom_id: 10, location: 'T701', capacity: 60 },
  { classroom_id: 11, location: 'T702', capacity: 60 },
  { classroom_id: 12, location: 'T703', capacity: 60 },
];

// 하드코딩된 예약 데이터
const reservations = {}; // 예약 데이터 초기화

// 강의실 목록 API
app.get('/api/classrooms', (req, res) => {
  res.json(classrooms);
});

// 예약 가능한 시간 API
app.get('/api/reservations/available/:classroomId', (req, res) => {
  const classroomId = parseInt(req.params.classroomId, 10);
  const allTimes = ['18:00', '19:00', '20:00', '21:00'];
  const reservedTimes = reservations[classroomId] || [];
  const availableTimes = allTimes.filter((time) => !reservedTimes.includes(time));
  res.json(availableTimes);
});

// 서버 시작
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

