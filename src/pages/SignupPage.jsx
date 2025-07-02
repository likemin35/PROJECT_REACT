import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    carrier: 'KT',  // 기본값 KT
    isKT: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'carrier') {
      setForm({
        ...form,
        carrier: value,
        isKT: value === 'KT', // KT 선택 시 true
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.phone) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    
    // 회원가입 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      console.log('회원가입 정보:', form);
      alert('회원가입이 완료되었습니다! 환영합니다!');
      navigate('/'); // 로그인 페이지로 이동
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.signupCard}>
        {/* 헤더 섹션 */}
        <div style={styles.header}>
          <div style={styles.logoSection}>
            <h2 style={styles.brandName}>KT 걷다가서재</h2>
          </div>
          <h1 style={styles.title}>회원가입</h1>
          <p style={styles.subtitle}>새로운 독서 여행을 시작하세요</p>
        </div>

        {/* 폼 섹션 */}
        <div style={styles.formSection}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>아이디</label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="사용하실 아이디를 입력하세요"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>이메일</label>
            <div style={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>전화번호 및 통신사</label>
            <div style={styles.phoneSection}>
              <div style={styles.phoneWrapper}>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="010-1234-5678"
                  style={{ ...styles.input, flex: 1 }}
                />
              </div>
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

          {/* KT 혜택 표시 */}
          {form.isKT && (
            <div style={styles.ktBenefitCard}>
              <div style={styles.benefitHeader}>
                <h4 style={styles.benefitTitle}>KT 고객 특별 혜택</h4>
              </div>
              <div style={styles.benefitList}>
                <div style={styles.benefitItem}>
                  <span style={styles.checkIcon}>✓</span>
                  첫 달 보라패스 무료 체험
                </div>
                <div style={styles.benefitItem}>
                  <span style={styles.checkIcon}>✓</span>
                  신규 가입 포인트 5,000P 지급
                </div>
                <div style={styles.benefitItem}>
                  <span style={styles.checkIcon}>✓</span>
                  KT 전용 도서 콘텐츠 이용
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={handleSubmit} 
            disabled={isLoading}
            style={{
              ...styles.submitButton,
              ...(isLoading ? styles.loadingButton : {})
            }}
          >
            {isLoading ? "가입 중..." : "회원가입"}
          </button>

          <div style={styles.loginSection}>
            <span style={styles.loginText}>이미 계정이 있으신가요?</span>
            <Link to="/" style={styles.loginLink}>
              로그인
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
    padding: '2rem 1rem'
  },
  signupCard: {
    background: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    padding: '3rem',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    color: '#333333',
    maxWidth: '500px',
    width: '100%'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem'
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  brandName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#8E24AA'
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
    color: '#8E24AA'
  },
  subtitle: {
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
    fontSize: '1rem',
    fontWeight: '600',
    color: '#333333'
  },
  inputWrapper: {
    position: 'relative'
  },
  input: {
    width: '100%',
    padding: '1.2rem 1.5rem',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    background: '#ffffff',
    color: '#333333',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  phoneSection: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'stretch'
  },
  phoneWrapper: {
    flex: 1,
    display: 'flex'
  },
  carrierSelect: {
    padding: '1.2rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    background: '#ffffff',
    color: '#333333',
    fontSize: '1rem',
    outline: 'none',
    minWidth: '120px',
    cursor: 'pointer'
  },
  ktBenefitCard: {
    background: '#f5edf8',
    border: '1px solid #d1c4e9',
    borderRadius: '8px',
    padding: '1.5rem',
    marginTop: '0.5rem'
  },
  benefitHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    marginBottom: '1rem'
  },
  benefitTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#8E24AA'
  },
  benefitList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontSize: '0.95rem',
    color: '#333333'
  },
  checkIcon: {
    color: '#8E24AA',
    fontWeight: 'bold'
  },
  submitButton: {
    width: '100%',
    padding: '1.3rem',
    borderRadius: '8px',
    border: 'none',
    background: '#8E24AA',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(142, 36, 170, 0.2)',
    marginTop: '1rem'
  },
  loadingButton: {
    background: '#d1c4e9',
    cursor: 'not-allowed',
    boxShadow: 'none'
  },
  loginSection: {
    textAlign: 'center',
    marginTop: '1.5rem'
  },
  loginText: {
    color: '#666666',
    fontSize: '0.95rem'
  },
  loginLink: {
    color: '#8E24AA',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginLeft: '0.5rem',
    fontSize: '0.95rem',
    transition: 'color 0.3s ease'
  }
};

// CSS 애니메이션 및 호버 효과 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = `  
  .signup-card input:focus {
    border-color: #8E24AA;
    box-shadow: 0 0 0 3px rgba(142, 36, 170, 0.1);
  }
  
  .signup-card select:focus {
    border-color: #8E24AA;
    box-shadow: 0 0 0 3px rgba(142, 36, 170, 0.1);
  }
  
  .submit-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(142, 36, 170, 0.3);
  }
  
  .login-link:hover {
    color: #7B1FA2;
  }
  
  .kt-benefit-card {
    animation: fadeInUp 0.5s ease-out;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);

export default SignupPage;