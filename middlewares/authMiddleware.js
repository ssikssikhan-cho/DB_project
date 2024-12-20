const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 요청 헤더에서 토큰 확인
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: '로그인이 필요합니다.' });
  }

  // JWT 검증
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
    }
    req.user = decoded; // 디코딩된 사용자 정보 추가
    next();
  });
};

module.exports = authMiddleware;
