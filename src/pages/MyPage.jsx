import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MyPage() {
  const navigate = useNavigate();
  
  // 사용자 정보 (실제로는 API에서 가져올 데이터)
  const [userInfo, setUserInfo] = useState({
    id: 'user123',
    email: 'user@example.com',
    name: '조하민',
    isAuthor: false, // 작가 등록 여부
    hasSubscription: true, // 보라패스 구독 여부
    subscriptionEndDate: '2025-02-15', // 구독 만료일
    authorInfo: null // 작가 정보 (작가일 경우)
  });

  const [showWritingMenu, setShowWritingMenu] = useState(false);

  // 구독 상태 텍스트 생성
  const getSubscriptionStatus = () => {
    if (userInfo.hasSubscription) {
      const endDate = new Date(userInfo.subscriptionEndDate);
      const today = new Date();
      const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      
      return {
        status: '구독중',
        color: '#8E24AA',
        detail: `${userInfo.subscriptionEndDate}까지 (${daysLeft}일 남음)`
      };
    } else {
      return {
        status: '미구독',
        color: 'rgba(255, 255, 255, 0.6)',
        detail: '보라패스를 구독하고 무제한으로 읽어보세요'
      };
    }
  };

  const subscriptionInfo = getSubscriptionStatus();

  // 작가 등록 처리 (실제로는 작가 등록 페이지로 이동)
  const handleAuthorRegistration = () => {
    // 작가 등록 완료 시뮬레이션
    setUserInfo(prev => ({
      ...prev,
      isAuthor: true,
      authorInfo: {
        registrationDate: new Date().toLocaleDateString(),
        status: 'active',
        publishedBooks: 0
      }
    }));
    alert('작가 등록이 완료되었습니다! 🎉\n이제 원고를 작성하고 출판할 수 있습니다.');
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>👤 마이페이지</h1>
          <p style={styles.subtitle}>내 정보와 활동을 관리하세요</p>
        </div>

        <div style={styles.sectionsGrid}>
          {/* 기본 정보 카드 */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                <span style={styles.cardIcon}>📋</span>
                기본 정보
              </h3>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>아이디</span>
                <span style={styles.infoValue}>{userInfo.id}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>이메일</span>
                <span style={styles.infoValue}>{userInfo.email}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>이름</span>
                <span style={styles.infoValue}>{userInfo.name}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>작가 등록</span>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: userInfo.isAuthor ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  color: userInfo.isAuthor ? '#4CAF50' : 'rgba(255, 255, 255, 0.6)',
                  border: `1px solid ${userInfo.isAuthor ? '#4CAF50' : 'rgba(255, 255, 255, 0.2)'}`
                }}>
                  {userInfo.isAuthor ? '✅ 등록완료' : '❌ 미등록'}
                </span>
              </div>
              {userInfo.isAuthor && userInfo.authorInfo && (
                <div style={styles.authorDetails}>
                  <p style={styles.authorDetailText}>
                    📅 등록일: {userInfo.authorInfo.registrationDate}
                  </p>
                  <p style={styles.authorDetailText}>
                    📚 출간 도서: {userInfo.authorInfo.publishedBooks}권
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 구독 정보 카드 */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                <span style={styles.cardIcon}>🌟</span>
                보라패스
              </h3>
              {userInfo.hasSubscription && (
                <div style={styles.subscriptionBadge}>PREMIUM</div>
              )}
            </div>
            <div style={styles.cardContent}>
              <div style={styles.subscriptionStatus}>
                <div style={{
                  ...styles.statusIndicator,
                  backgroundColor: userInfo.hasSubscription ? '#8E24AA' : 'rgba(255, 255, 255, 0.2)'
                }}>
                  {userInfo.hasSubscription ? '🌟' : '⭕'}
                </div>
                <div style={styles.subscriptionInfo}>
                  <div style={styles.subscriptionLabel}>{subscriptionInfo.status}</div>
                  <div style={styles.subscriptionDetail}>{subscriptionInfo.detail}</div>
                </div>
              </div>
              
              {userInfo.hasSubscription ? (
                <div style={styles.subscriptionBenefits}>
                  <div style={styles.benefitsGrid}>
                    <div style={styles.benefitItem}>✨ 무제한 읽기</div>
                    <div style={styles.benefitItem}>🚫 광고 없음</div>
                    <div style={styles.benefitItem}>🔔 신간 알림</div>
                    <div style={styles.benefitItem}>📊 독서 통계</div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/charge')}
                  style={styles.subscribeButton}
                >
                  🌟 보라패스 구독하기
                </button>
              )}
            </div>
          </div>

          {/* 포인트 정보 카드 */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                <span style={styles.cardIcon}>💎</span>
                포인트
              </h3>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.pointDisplay}>
                <div style={styles.pointAmount}>12,500P</div>
                <div style={styles.pointLabel}>보유 포인트</div>
              </div>
              <button
                onClick={() => navigate('/charge')}
                style={styles.chargeButton}
              >
                💎 충전하기
              </button>
            </div>
          </div>

          {/* 작가 활동 카드 */}
          <div style={styles.wideCard}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                <span style={styles.cardIcon}>✍️</span>
                작가 활동
              </h3>
            </div>
            <div style={styles.cardContent}>
              
              {userInfo.isAuthor ? (
                <div style={styles.authorSection}>
                  <div style={styles.authorWelcome}>
                    <h4 style={styles.welcomeText}>🎉 작가로 활동 중입니다!</h4>
                    <p style={styles.welcomeSubtext}>창작 활동을 통해 독자들과 소통해보세요</p>
                  </div>
                  
                  <div style={styles.authorActions}>
                    <button
                      onClick={() => navigate('/manuscripts/create')}
                      style={styles.primaryActionButton}
                    >
                      <span style={styles.buttonIcon}>📝</span>
                      새 원고 작성
                    </button>
                    
                    <button
                      onClick={() => setShowWritingMenu(!showWritingMenu)}
                      style={styles.secondaryActionButton}
                    >
                      <span style={styles.buttonIcon}>📚</span>
                      내 원고 관리
                    </button>
                  </div>

                  {/* 원고 관리 메뉴 */}
                  {showWritingMenu && (
                    <div style={styles.writingMenu}>
                      <div style={styles.menuItems}>
                        <button
                          onClick={() => {
                            setShowWritingMenu(false);
                            navigate('/manuscripts/edit/1');
                          }}
                          style={styles.menuItem}
                        >
                          <span style={styles.menuIcon}>🔧</span>
                          원고 수정
                        </button>
                        <button
                          onClick={() => {
                            setShowWritingMenu(false);
                            alert('원고 목록 페이지로 이동합니다.');
                          }}
                          style={styles.menuItem}
                        >
                          <span style={styles.menuIcon}>📄</span>
                          원고 목록
                        </button>
                        <button
                          onClick={() => {
                            setShowWritingMenu(false);
                            alert('출간 현황 페이지로 이동합니다.');
                          }}
                          style={styles.menuItem}
                        >
                          <span style={styles.menuIcon}>📊</span>
                          출간 현황
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={styles.nonAuthorSection}>
                  <div style={styles.registrationPrompt}>
                    <div style={styles.promptIcon}>📚</div>
                    <h4 style={styles.promptTitle}>작가가 되어보세요!</h4>
                    <p style={styles.promptText}>
                      나만의 이야기를 세상과 공유하고, 독자들과 소통할 수 있습니다.
                    </p>
                    <div style={styles.authorBenefits}>
                      <div style={styles.benefitItem}>✍️ 원고 작성 및 출간</div>
                      <div style={styles.benefitItem}>💰 도서 판매 수익</div>
                      <div style={styles.benefitItem}>📈 독자 반응 분석</div>
                      <div style={styles.benefitItem}>🏆 작가 등급 시스템</div>
                    </div>
                  </div>
                  
                  <Link to="/register">
                    <button
                      style={styles.registrationButton}
                      onClick={handleAuthorRegistration}
                    >
                      🌟 작가 등록하기
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    color: 'white'
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem 1rem',
    fontFamily: 'sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0
  },
  sectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    gridTemplateRows: 'auto'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  },
  wideCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    gridColumn: '1 / -1'
  },
  cardHeader: {
    padding: '1.5rem 1.5rem 1rem 1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  cardIcon: {
    fontSize: '1.5rem'
  },
  cardContent: {
    padding: '1.5rem'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  infoLabel: {
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  infoValue: {
    color: 'white'
  },
  statusBadge: {
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  authorDetails: {
    marginTop: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  authorDetailText: {
    margin: '0.3rem 0',
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  subscriptionBadge: {
    padding: '0.3rem 0.8rem',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  subscriptionStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  statusIndicator: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem'
  },
  subscriptionInfo: {
    flex: 1
  },
  subscriptionLabel: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.3rem'
  },
  subscriptionDetail: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  subscriptionBenefits: {
    background: 'rgba(142, 36, 170, 0.1)',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(142, 36, 170, 0.2)'
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '0.5rem'
  },
  benefitItem: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
    padding: '0.5rem',
    textAlign: 'center'
  },
  subscribeButton: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(142, 36, 170, 0.3)'
  },
  pointDisplay: {
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  pointAmount: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem'
  },
  pointLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1rem'
  },
  chargeButton: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    color: '#1a1a2e',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
  },
  authorSection: {
    textAlign: 'center'
  },
  authorWelcome: {
    marginBottom: '2rem'
  },
  welcomeText: {
    color: '#4CAF50',
    margin: '0 0 0.5rem 0',
    fontSize: '1.3rem'
  },
  welcomeSubtext: {
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0
  },
  authorActions: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  primaryActionButton: {
    flex: 1,
    minWidth: '200px',
    padding: '1rem',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    color: '#1a1a2e',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
  },
  secondaryActionButton: {
    flex: 1,
    minWidth: '200px',
    padding: '1rem',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(142, 36, 170, 0.3)'
  },
  buttonIcon: {
    fontSize: '1.2rem'
  },
  writingMenu: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: '1rem'
  },
  menuItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  menuItem: {
    padding: '0.8rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '1rem',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease'
  },
  menuIcon: {
    fontSize: '1.2rem'
  },
  nonAuthorSection: {
    textAlign: 'center'
  },
  registrationPrompt: {
    marginBottom: '2rem'
  },
  promptIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  promptTitle: {
    color: '#FFD700',
    margin: '0 0 1rem 0',
    fontSize: '1.5rem'
  },
  promptText: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  },
  authorBenefits: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  registrationButton: {
    padding: '1.2rem 2rem',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    color: '#1a1a2e',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
  }
};
export default MyPage;