import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      <div style={styles.leftSection}>
        <button onClick={() => navigate('/charge')} style={styles.navButton}>
          충전
        </button>
      </div>

      <div style={styles.logoContainer} onClick={() => navigate('/main')}>
        <img
          src="/assets/logo.png"
          alt="KT 걷다가서재 로고"
          style={styles.logoImage}
        />
      </div>

      <div style={styles.rightSection}>
        <button onClick={() => navigate('/mypage')} style={styles.navButton}>
          마이페이지
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: '#ffffff',
    borderBottom: '1px solid #e1bee7',
    padding: '0.5rem 2rem',
    height: '72px', // 명확한 높이 지정
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    fontFamily: 'sans-serif'
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '120px'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '120px',
    justifyContent: 'flex-end'
  },
  navButton: {
    padding: '0.8rem 1.2rem',
    background: '#f9f5fb',
    border: '1px solid #e1bee7',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#8E24AA',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  },
  logoContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  logoImage: {
    height: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  }
};

export default Navbar;
