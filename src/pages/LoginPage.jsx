import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userId || !email) {
      alert('아이디와 이메일을 입력해주세요.');
      return;
    }

    // 실제 로그인 검증은 생략하고 바로 메인으로 이동
    navigate('/main');  // ✅ 여기 수정
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
      <h2>📚 KT 걷다가서재 로그인</h2>
      <div style={{ margin: '1rem' }}>
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ padding: '0.5rem', width: '200px' }}
        />
      </div>
      <div style={{ margin: '1rem' }}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem', width: '200px' }}
        />
      </div>
      <div style={{ margin: '1rem' }}>
        <button onClick={handleLogin} style={btnStyle}>로그인</button>
      </div>
      <div>
        <Link to="/signup">
          <button style={btnStyle}>회원가입</button>
        </Link>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#ff7043',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default LoginPage;
