const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const reservationsRouter = require('./routes/reservations');
const classroomsRouter = require('./routes/classrooms'); // 추가
const authRouter = require('./routes/auth'); // 추가
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// 환경 변수 설정
require('dotenv').config();

// API 라우터 설정
app.use('/api', reservationsRouter);
app.use('/api', classroomsRouter); // 추가
app.use('/api/auth', authRouter); // 추가

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});