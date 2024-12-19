const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('로그인이 필요합니다.');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('유효하지 않은 토큰입니다.');
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;