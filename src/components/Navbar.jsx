import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      {/* 왼쪽: 포인트 충전 아이콘 */}
      <div style={styles.leftSection}>
        <img
          src="/assets/coin_icon.png" //
          alt="포인트충전"
          style={styles.icon}
          onClick={() => navigate('/charge')}
        />
      </div>

      {/* 가운데: 로고 클릭 시 메인으로 이동 */}
      <div style={styles.logoContainer} onClick={() => navigate('/main')}>
        <img
          src="/assets/logo.png"
          alt="logo"
          style={styles.logoImage}
        />
      </div>

      {/* 오른쪽: 마이페이지 링크 */}
      <div style={styles.mypage} onClick={() => navigate('/mypage')}>
        MYPAGE
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#ffffff',
    padding: '0.8rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
  },
  leftSection: {
    width: '30px',
    cursor: 'pointer',
  },
  icon: {
    width: '48px',
    height: '48px',
  },
  logoContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  logoImage: {
    height: '50px',
  },
  mypage: {
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  }
};

export default Navbar;
