const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const classroomsRouter = require('./routes/classrooms');
const reservationsRouter = require('./routes/reservations');
require('dotenv').config(); // 환경 변수 로드

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// 기본 페이지로 로그인 화면 설정
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// 라우터 설정
app.use('/api/auth', authRouter);
app.use('/api/classrooms', classroomsRouter);
app.use('/api/reservations', reservationsRouter);

// 서버 시작
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});
