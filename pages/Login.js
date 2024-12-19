import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { user_id: userId, password });
      localStorage.setItem('token', response.data.token); // JWT 토큰 저장
      history.push('/reservation'); // 예약 페이지로 이동
    } catch (error) {
      setError('잘못된 로그인입니다.');
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="학번"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>

      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError('')}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default Login;
