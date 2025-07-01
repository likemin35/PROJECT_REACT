import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userId || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    navigate('/main');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.hello}>Hello!</h1>
      <h2 style={styles.title}>Log In</h2>

      <div style={styles.inputGroup}>
        <label style={styles.label}>ID</label>
        <input
          type="text"
          placeholder="아이디를 입력하세요."
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Password</label>
        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <span
            style={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
      </div>

      <div style={styles.optionsRow}>
        <label style={styles.checkboxWrapper}>
          <input type="checkbox" />
          <span style={styles.checkboxText}>Remember Me</span>
        </label>
        <span style={styles.forgot}>Forget Password</span>
      </div>

      <button style={styles.loginButton} onClick={handleLogin}>Log In</button>

      <div style={{ margin: '1rem 0', color: '#999' }}>or</div>

      <div style={styles.socialContainer}>
        <img src="/assets/kakao.png" alt="kakao" style={styles.socialIcon} />
        <img src="/assets/naver.png" alt="naver" style={styles.socialIcon} />
        <img src="/assets/google.png" alt="google" style={styles.socialIcon} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/signup" style={styles.signupLink}>회원가입</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'sans-serif',
    maxWidth: '400px',
    margin: '2rem auto',
    textAlign: 'center',
  },
  hello: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2a62ff',
    marginBottom: '1rem'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2a62ff',
    textAlign: 'left',
    marginBottom: '1rem'
  },
  inputGroup: {
    marginBottom: '1rem',
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
  passwordWrapper: {
    position: 'relative'
  },
  eyeIcon: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer'
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  checkboxText: {
    marginLeft: '0.4rem',
    color: '#2a62ff',
    fontSize: '0.9rem'
  },
  forgot: {
    color: '#2a62ff',
    fontSize: '0.9rem',
    cursor: 'pointer'
  },
  loginButton: {
    backgroundColor: '#2a62ff',
    color: 'white',
    padding: '0.8rem 1.2rem',
    borderRadius: '30px',
    border: 'none',
    fontSize: '1rem',
    width: '100%',
    cursor: 'pointer'
  },
  socialContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    margin: '1rem 0',
  },
  socialIcon: {
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    objectFit: 'contain'
  },
  signupLink: {
    textDecoration: 'none',
    color: '#2a62ff',
    fontWeight: 'bold',
  }
};

export default LoginPage;
