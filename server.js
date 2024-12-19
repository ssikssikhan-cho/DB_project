const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const reservationsRouter = require('./routes/reservations');
const classroomsRouter = require('./routes/classrooms');
const authRouter = require('./routes/auth');
const authMiddleware = require('./server/middlewares/authMiddleware');

// 환경 변수 설정
dotenv.config();

app.use(bodyParser.json());
app.use(express.static('public'));

// API 라우터 설정
app.use('/api/auth', authRouter);
app.use('/api/classrooms', classroomsRouter);
app.use('/api/reservations', authMiddleware, reservationsRouter);

// 기본 라우터 설정
app.get('/', (req, res) => {
  res.send('T동 강의실 대여 서비스 서버 실행 중');
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});