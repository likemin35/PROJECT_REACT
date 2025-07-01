import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MyPage() {
  const dummyUser = {
    id: 'user123',
    email: 'user@example.com',
    name: '조하민',
    isAuthor: false
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.title}>📄 마이페이지</h2>

        <div style={styles.card}>
          <p><strong>아이디:</strong> {dummyUser.id}</p>
          <p><strong>이메일:</strong> {dummyUser.email}</p>
          <p><strong>이름:</strong> {dummyUser.name}</p>
          <p><strong>직업:</strong> {dummyUser.isAuthor ? '작가' : '독자'}</p>
        </div>

        {!dummyUser.isAuthor && (
          <Link to="/register">
            <button style={styles.button}>작가 등록하기</button>
          </Link>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '0 1rem',
    fontFamily: 'sans-serif'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '1.8rem'
  },
  card: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    marginBottom: '1.5rem'
  },
  button: {
    display: 'block',
    margin: '0 auto',
    padding: '0.6rem 1.5rem',
    backgroundColor: '#2a62ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

export default MyPage;
