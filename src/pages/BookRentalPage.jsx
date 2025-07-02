import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const dummyBooks = [
  {
    id: 1,
    title: '해리포터',
    author: '조하민',
    views: 15420,
    price: 1000,
    image: '/assets/sample1.png',
    summary: '평범한 소년 해리가 마법의 세계에 발을 들이면서 시작되는 모험 이야기입니다. 호그와트 마법학교에서 친구들과 함께 성장하며, 어둠의 마법사와 맞서 싸우는 용기와 우정의 서사시입니다. 마법과 현실이 만나는 환상적인 세계에서 펼쳐지는 감동적인 성장담을 만나보세요.'
  },
];

function BookRentalPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = dummyBooks.find((b) => b.id === parseInt(bookId));

  const [userPoint, setUserPoint] = useState(3000);
  const [hasSubscription, setHasSubscription] = useState(false); // 구독 여부
  const [showPointModal, setShowPointModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  if (!book) {
    return (
      <div style={styles.pageContainer}>
        <Navbar />
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>📚</div>
          <h2 style={styles.errorTitle}>도서를 찾을 수 없습니다</h2>
          <p style={styles.errorText}>요청하신 도서 정보를 찾을 수 없습니다.</p>
          <button onClick={() => navigate('/main')} style={styles.backButton}>
            메인으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handlePointRead = () => {
    if (userPoint < book.price) {
      alert('보유 포인트가 부족합니다.\n포인트를 충전해주세요.');
      return;
    }
    setShowPointModal(true);
  };

  const confirmPointRead = () => {
    setUserPoint(prev => prev - book.price);
    setShowPointModal(false);
    alert('도서 대여가 완료되었습니다! 📖\n3일간 이용하실 수 있습니다.');
    // 실제로는 독서 페이지로 이동
  };

  const handleSubscriptionRead = () => {
    if (!hasSubscription) {
      setShowSubscriptionModal(true);
      return;
    }
    alert('보라패스로 도서를 시작합니다! 🌟\n무제한으로 이용하세요.');
    // 실제로는 독서 페이지로 이동
  };

  const confirmSubscription = () => {
    setShowSubscriptionModal(false);
    navigate('/charge'); // 구독 페이지로 이동
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      
      <div style={styles.container}>
        <div style={styles.bookCard}>
          {/* 책 표지와 기본 정보 */}
          <div style={styles.bookHeader}>
            <div style={styles.imageContainer}>
              <img src={book.image} alt={book.title} style={styles.bookImage} />
              <div style={styles.imageGlow}></div>
            </div>
            
            <div style={styles.bookInfo}>
              <h1 style={styles.bookTitle}>{book.title}</h1>
              <div style={styles.authorSection}>
                <span style={styles.authorIcon}>✍️</span>
                <span style={styles.author}>{book.author}</span>
              </div>
              <div style={styles.viewsSection}>
                <span style={styles.viewsIcon}>👁️</span>
                <span style={styles.views}>{book.views.toLocaleString()}회 조회</span>
              </div>
              <div style={styles.priceSection}>
                <div style={styles.priceCard}>
                  <span style={styles.priceLabel}>포인트 대여</span>
                  <span style={styles.priceValue}>{book.price.toLocaleString()}P</span>
                </div>
              </div>
            </div>
          </div>

          {/* 줄거리 요약 */}
          <div style={styles.summarySection}>
            <h3 style={styles.summaryTitle}>
              <span style={styles.summaryIcon}>📖</span>
              줄거리
            </h3>
            <p style={styles.summaryText}>{book.summary}</p>
          </div>

          {/* 읽기 옵션 버튼들 */}
          <div style={styles.readingOptions}>
            <h3 style={styles.optionsTitle}>
              <span style={styles.optionsIcon}>📚</span>
              읽기 방법 선택
            </h3>
            
            <div style={styles.buttonContainer}>
              {/* 보라패스로 읽기 */}
              <div style={styles.optionCard}>
                <div style={styles.optionHeader}>
                  <div style={styles.optionBadge}>PREMIUM</div>
                  <h4 style={styles.optionTitle}>
                    <span style={styles.optionIcon}>🌟</span>
                    보라패스로 읽기
                  </h4>
                  <p style={styles.optionDesc}>
                    {hasSubscription ? '무제한 이용 가능' : '구독이 필요합니다'}
                  </p>
                </div>
                <button
                  onClick={handleSubscriptionRead}
                  style={{
                    ...styles.readButton,
                    ...styles.subscriptionButton,
                    ...(hasSubscription ? {} : styles.inactiveButton)
                  }}
                >
                  {hasSubscription ? (
                    <>
                      <span style={styles.buttonIcon}>🌟</span>
                      바로 읽기
                    </>
                  ) : (
                    <>
                      <span style={styles.buttonIcon}>💜</span>
                      보라패스 구독하기
                    </>
                  )}
                </button>
              </div>

              {/* 포인트로 읽기 */}
              <div style={styles.optionCard}>
                <div style={styles.optionHeader}>
                  <div style={styles.optionBadge}>3일 대여</div>
                  <h4 style={styles.optionTitle}>
                    <span style={styles.optionIcon}>💎</span>
                    포인트로 읽기
                  </h4>
                  <p style={styles.optionDesc}>
                    현재 {userPoint.toLocaleString()}P 보유
                  </p>
                </div>
                <button
                  onClick={handlePointRead}
                  style={{
                    ...styles.readButton,
                    ...styles.pointButton,
                    ...(userPoint < book.price ? styles.inactiveButton : {})
                  }}
                >
                  <span style={styles.buttonIcon}>💎</span>
                  {book.price.toLocaleString()}P로 읽기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 포인트 결제 확인 모달 */}
        {showPointModal && (
          <div style={styles.modalOverlay} onClick={() => setShowPointModal(false)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>
                  <span style={styles.modalIcon}>💎</span>
                  포인트 대여 확인
                </h3>
              </div>
              <div style={styles.modalContent}>
                <div style={styles.modalRow}>
                  <span>도서</span>
                  <span style={styles.modalValue}>{book.title}</span>
                </div>
                <div style={styles.modalRow}>
                  <span>대여 기간</span>
                  <span style={styles.modalValue}>3일</span>
                </div>
                <div style={styles.modalRow}>
                  <span>사용 포인트</span>
                  <span style={styles.modalValue}>{book.price.toLocaleString()}P</span>
                </div>
                <div style={styles.modalRow}>
                  <span>잔여 포인트</span>
                  <span style={styles.modalPrice}>{(userPoint - book.price).toLocaleString()}P</span>
                </div>
              </div>
              <div style={styles.modalButtons}>
                <button onClick={confirmPointRead} style={styles.confirmButton}>
                  <span style={styles.buttonIcon}>✅</span>
                  확인
                </button>
                <button onClick={() => setShowPointModal(false)} style={styles.cancelButton}>
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 구독 안내 모달 */}
        {showSubscriptionModal && (
          <div style={styles.modalOverlay} onClick={() => setShowSubscriptionModal(false)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>
                  <span style={styles.modalIcon}>🌟</span>
                  보라패스 구독 안내
                </h3>
              </div>
              <div style={styles.modalContent}>
                <div style={styles.subscriptionInfo}>
                  <h4 style={styles.subscriptionTitle}>보라패스란?</h4>
                  <div style={styles.benefitsList}>
                    <div style={styles.benefitItem}>
                      <span style={styles.benefitIcon}>✅</span>
                      모든 도서 무제한 읽기
                    </div>
                    <div style={styles.benefitItem}>
                      <span style={styles.benefitIcon}>✅</span>
                      광고 없는 깔끔한 독서
                    </div>
                    <div style={styles.benefitItem}>
                      <span style={styles.benefitIcon}>✅</span>
                      신간 우선 예약
                    </div>
                    <div style={styles.benefitItem}>
                      <span style={styles.benefitIcon}>✅</span>
                      독서 기록 자동 저장
                    </div>
                  </div>
                  <div style={styles.priceHighlight}>
                    <strong>월 9,900원</strong>으로 시작하세요!
                  </div>
                </div>
              </div>
              <div style={styles.modalButtons}>
                <button onClick={confirmSubscription} style={styles.subscribeButton}>
                  <span style={styles.buttonIcon}>🌟</span>
                  구독하러 가기
                </button>
                <button onClick={() => setShowSubscriptionModal(false)} style={styles.cancelButton}>
                  나중에
                </button>
              </div>
            </div>
          </div>
        )}
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
  errorContainer: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  errorIcon: {
    fontSize: '4rem',
    marginBottom: '1rem'
  },
  errorTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: 'white'
  },
  errorText: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  backButton: {
    padding: '1rem 2rem',
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
  bookCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '2.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  },
  bookHeader: {
    display: 'flex',
    gap: '2.5rem',
    marginBottom: '2.5rem',
    flexWrap: 'wrap'
  },
  imageContainer: {
    position: 'relative',
    flexShrink: 0
  },
  bookImage: {
    width: '250px',
    height: '350px',
    objectFit: 'cover',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    position: 'relative',
    zIndex: 1
  },
  imageGlow: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    right: '10px',
    bottom: '10px',
    background: 'linear-gradient(135deg, #FFD700 0%, #8E24AA 100%)',
    borderRadius: '16px',
    opacity: 0.3,
    filter: 'blur(20px)',
    zIndex: 0
  },
  bookInfo: {
    flex: 1,
    minWidth: '350px'
  },
  bookTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  authorSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    marginBottom: '1rem'
  },
  authorIcon: {
    fontSize: '1.5rem'
  },
  author: {
    fontSize: '1.4rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500'
  },
  viewsSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    marginBottom: '2rem'
  },
  viewsIcon: {
    fontSize: '1.3rem'
  },
  views: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.6)'
  },
  priceSection: {
    marginTop: '2rem'
  },
  priceCard: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    background: 'rgba(255, 215, 0, 0.1)',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)'
  },
  priceLabel: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '0.5rem'
  },
  priceValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  summarySection: {
    marginBottom: '2.5rem',
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  summaryTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem'
  },
  summaryIcon: {
    fontSize: '2rem'
  },
  summaryText: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: 0
  },
  readingOptions: {
    marginTop: '2rem'
  },
  optionsTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '2rem',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem'
  },
  optionsIcon: {
    fontSize: '2.2rem'
  },
  buttonContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem'
  },
  optionCard: {
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  optionHeader: {
    marginBottom: '2rem'
  },
  optionBadge: {
    display: 'inline-block',
    padding: '0.4rem 1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  optionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 0 1rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  optionIcon: {
    fontSize: '1.8rem'
  },
  optionDesc: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0
  },
  readButton: {
    width: '100%',
    padding: '1.5rem 2rem',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem'
  },
  subscriptionButton: {
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    boxShadow: '0 6px 20px rgba(142, 36, 170, 0.4)'
  },
  pointButton: {
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    color: '#1a1a2e',
    boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4)'
  },
  inactiveButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'not-allowed',
    boxShadow: 'none'
  },
  buttonIcon: {
    fontSize: '1.5rem'
  },
  // 모달 스타일
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(10px)'
  },
  modal: {
    background: 'rgba(26, 26, 46, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '2.5rem',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    color: 'white'
  },
  modalHeader: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  modalTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem'
  },
  modalIcon: {
    fontSize: '2rem'
  },
  modalContent: {
    marginBottom: '2rem'
  },
  modalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    fontSize: '1.1rem'
  },
  modalValue: {
    fontWeight: 'bold',
    color: 'white'
  },
  modalPrice: {
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subscriptionInfo: {
    textAlign: 'center'
  },
  subscriptionTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: 'white'
  },
  benefitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem'
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    fontSize: '1.1rem'
  },
  benefitIcon: {
    fontSize: '1.3rem'
  },
  priceHighlight: {
    fontSize: '1.4rem',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  modalButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center'
  },
  confirmButton: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    color: '#1a1a2e',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
  },
  subscribeButton: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(142, 36, 170, 0.3)'
  },
  cancelButton: {
    padding: '1rem 2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease'
  }
};

export default BookRentalPage;

