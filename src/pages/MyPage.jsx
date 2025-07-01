import React from 'react';
import { Link } from 'react-router-dom';

function MyPage() {
  const dummyUser = {
    id: 'user123',
    email: 'user@example.com',
    name: '조하민',
    isAuthor: false
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>📄 마이페이지</h2>
      <div style={{ marginBottom: '1.5rem' }}>
        <p><strong>아이디:</strong> {dummyUser.id}</p>
        <p><strong>이메일:</strong> {dummyUser.email}</p>
        <p><strong>이름:</strong> {dummyUser.name}</p>
        <p><strong>직업:</strong> {dummyUser.isAuthor ? '작가' : '독자'}</p>
      </div>

      {!dummyUser.isAuthor && (
        <Link to="/register">
          <button style={btnStyle}>작가 등록하기</button>
        </Link>
      )}
    </div>
  );
}

const btnStyle = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default MyPage;