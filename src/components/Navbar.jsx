import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      <div style={styles.leftSection}>
        <button onClick={() => navigate('/charge')} style={styles.iconButton}>
          <span style={styles.iconLabel}>충전</span>
        </button>
      </div>

      <div style={styles.logoContainer} onClick={() => navigate('/main')}>
        <div style={styles.logoWrapper}>
          <div style={styles.logoText}>
            <div style={styles.brandName}>KT 걷다가서재</div>
            <div style={styles.brandTagline}>Digital Library</div>
          </div>
        </div>
      </div>

      <div style={styles.rightSection}>
        <button onClick={() => navigate('/mypage')} style={styles.mypageButton}>
          <span style={styles.mypageText}>MYPAGE</span>
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
    borderBottom: '1px solid #ddd',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '120px'
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem',
    padding: '0.8rem 1rem',
    background: '#f8f8f8',
    border: '1px solid #eeeeee',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#8E24AA'
  },
  iconLabel: { fontSize: '0.8rem', fontWeight: '600' },
  logoContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '16px'
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  brandName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#8E24AA'
  },
  brandTagline: {
    fontSize: '0.8rem',
    color: '#888',
    fontWeight: '500',
    letterSpacing: '0.5px'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '120px',
    justifyContent: 'flex-end'
  },
  mypageButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.2rem',
    background: '#f3e5f5',
    border: '1px solid #ce93d8',
    borderRadius: '12px',
    cursor: 'pointer',
    color: '#8E24AA'
  },
  mypageText: { fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.5px' }
};

export default Navbar;