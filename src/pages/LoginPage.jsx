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
      <div style={styles.loginCard}>
        <div style={styles.logoSection}>
          <h2 style={styles.brandName}>KT 걷다가서재</h2>
          <p style={styles.tagline}>당신의 디지털 서재</p>
        </div>

        <div style={styles.formSection}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>아이디</label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                placeholder="아이디를 입력하세요"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>비밀번호</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <span
                style={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '숨기기' : '보기'}
              </span>
            </div>
          </div>

          <div style={styles.optionsRow}>
            <label style={styles.checkboxWrapper}>
              <input type="checkbox" style={styles.checkbox} />
              <span style={styles.checkboxText}>로그인 상태 유지</span>
            </label>
            <span style={styles.forgotPassword}>비밀번호 찾기</span>
          </div>

          <button style={styles.loginButton} onClick={handleLogin}>
            <span style={styles.buttonText}>로그인</span>
          </button>

          <div style={styles.divider}>
            <span style={styles.dividerText}>또는</span>
          </div>

          <div style={styles.socialContainer}>
            <button style={styles.socialButton}>
              <img src="/assets/kakao.png" alt="카카오" style={styles.socialIcon} />
              카카오
            </button>
            <button style={styles.socialButton}>
              <img src="/assets/naver.png" alt="네이버" style={styles.socialIcon} />
              네이버
            </button>
            <button style={styles.socialButton}>
              <img src="/assets/google.png" alt="구글" style={styles.socialIcon} />
              구글
            </button>
          </div>

          <div style={styles.signupSection}>
            <span style={styles.signupText}>계정이 없으신가요?</span>
            <Link to="/signup" style={styles.signupLink}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    padding: '1rem'
  },
  loginCard: {
    background: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    padding: '2.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    color: '#333333',
    maxWidth: '450px',
    width: '100%'
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  brandName: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
    color: '#8E24AA'
  },
  tagline: {
    fontSize: '1rem',
    color: '#666666',
    margin: 0
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#333333'
  },
  inputWrapper: {
    position: 'relative'
  },
  input: {
    width: '100%',
    padding: '1rem 1.2rem',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    background: '#ffffff',
    color: '#333333',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  passwordWrapper: {
    position: 'relative'
  },
  eyeIcon: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '0.8rem',
    color: '#8E24AA',
    opacity: 0.7
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem'
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  },
  checkbox: {
    width: '16px',
    height: '16px'
  },
  checkboxText: {
    color: '#666666'
  },
  forgotPassword: {
    color: '#8E24AA',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  loginButton: {
    width: '100%',
    padding: '1.2rem',
    borderRadius: '8px',
    border: 'none',
    background: '#8E24AA',
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(142, 36, 170, 0.3)'
  },
  buttonText: {
    display: 'block',
    transform: 'translateY(0)',
    transition: 'transform 0.2s ease'
  },
  divider: {
    position: 'relative',
    textAlign: 'center',
    margin: '1rem 0'
  },
  dividerText: {
    background: '#ffffff',
    padding: '0 1rem',
    color: '#999999',
    fontSize: '0.9rem'
  },
  socialContainer: {
    display: 'flex',
    gap: '0.8rem',
    flexWrap: 'wrap'
  },
  socialButton: {
    flex: 1,
    minWidth: '100px',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    background: '#ffffff',
    color: '#333333',
    fontSize: '0.9rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease'
  },
  socialIcon: {
    width: '20px',
    height: '20px'
  },
  signupSection: {
    textAlign: 'center',
    marginTop: '1rem'
  },
  signupText: {
    color: '#666666',
    fontSize: '0.9rem'
  },
  signupLink: {
    color: '#8E24AA',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginLeft: '0.5rem',
    fontSize: '0.9rem'
  }
};

export default LoginPage;