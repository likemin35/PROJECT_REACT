import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    carrier: 'KT',
    isKT: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'carrier') {
      setForm({
        ...form,
        carrier: value,
        isKT: value === 'KT',
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
    
    setTimeout(() => {
      setIsLoading(false);
      console.log('회원가입 정보:', form);
      alert('회원가입이 완료되었습니다! 환영합니다!');
      navigate('/');
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.signupCard}>
        <div style={styles.header}>
          <div style={styles.logoSection}>
            <h2 style={styles.brandName}>KT 걷다가서재</h2>
          </div>
          <h1 style={styles.title}>회원가입</h1>
          <p style={styles.subtitle}>새로운 독서 여행을 시작하세요</p>
        </div>

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
  // 스타일 객체 생략 (기존 코드에 포함됨)
};

export default SignupPage;
