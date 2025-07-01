import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    carrier: 'KT',  // 기본값 KT
    isKT: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'carrier') {
      setForm({
        ...form,
        carrier: value,
        isKT: value === 'KT', // ✅ KT 선택 시 true
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    console.log('회원가입 정보:', form);
    alert('회원가입 완료!');
    navigate('/'); // ✅ 로그인 페이지로 이동
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>회원가입</h1>

      <div style={styles.inputGroup}>
        <label style={styles.label}>아이디</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>전화번호</label>
        <div style={styles.phoneRow}>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={{ ...styles.input, flex: 1 }}
          />
          <select
            name="carrier"
            value={form.carrier}
            onChange={handleChange}
            style={styles.carrierSelect}
          >
            <option value="KT">KT</option>
            <option value="SKT">SKT</option>
            <option value="LG U+">LG U+</option>
            <option value="알뜰폰">알뜰폰</option>
          </select>
        </div>
      </div>

      <button onClick={handleSubmit} style={styles.submitButton}>회원가입</button>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'sans-serif',
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '1rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2a62ff',
    marginBottom: '2rem'
  },
  inputGroup: {
    marginBottom: '1.5rem',
    textAlign: 'left'
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '12px',
    border: '1px solid #ddd',
    backgroundColor: '#f0f4ff',
    fontSize: '1rem'
  },
  phoneRow: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  },
  carrierSelect: {
    padding: '0.6rem',
    borderRadius: '12px',
    border: '1px solid #ddd',
    backgroundColor: '#f0f4ff',
    fontSize: '0.9rem',
    width: '110px',
  },
  submitButton: {
    backgroundColor: '#2a62ff',
    color: 'white',
    padding: '0.8rem 1.2rem',
    borderRadius: '30px',
    border: 'none',
    fontSize: '1rem',
    width: '100%',
    cursor: 'pointer'
  }
};

export default SignupPage;
