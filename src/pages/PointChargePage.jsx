import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PaymentForm from '../components/PaymentForm';

function PointChargePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('point'); // 'point' or 'subscription'
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(12500); // 더미 데이터

  const pointOptions = [
    { point: 5000, price: 5000, bonus: 0 },
    { point: 10000, price: 10000, bonus: 0 },
    { point: 22000, price: 20000, bonus: 2000 },
    { point: 55000, price: 50000, bonus: 5000 },
  ];

  const subscriptionOption = {
    name: '보라패스',
    duration: '1개월',
    price: 9900,
    benefits: ['무제한 도서 대여', '광고 제거', '우선 예약 서비스']
  };

  const handleItemSelect = (item) => {
    setSelectedAmount(item);
    setPaymentMethod(null); // 결제 수단 초기화
  };

  const resetSelection = () => {
    setSelectedAmount(null);
    setPaymentMethod(null);
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>💎 충전 & 구독</h1>
          <p style={styles.subtitle}>포인트 충전 또는 구독권 구매를 선택하세요</p>
          
          {/* 현재 포인트 표시 */}
          <div style={styles.currentPointsCard}>
            <div style={styles.pointsIcon}>💎</div>
            <div style={styles.pointsInfo}>
              <div style={styles.pointsLabel}>현재 보유 포인트</div>
              <div style={styles.pointsAmount}>{currentPoints.toLocaleString()}P</div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div style={styles.tabContainer}>
          <button
            onClick={() => {
              setActiveTab('point');
              resetSelection();
            }}
            style={{
              ...styles.tab,
              ...(activeTab === 'point' ? styles.activeTab : styles.inactiveTab)
            }}
          >
            <span style={styles.tabIcon}>💎</span>
            포인트 충전
          </button>
          <button
            onClick={() => {
              setActiveTab('subscription');
              resetSelection();
            }}
            style={{
              ...styles.tab,
              ...(activeTab === 'subscription' ? styles.activeTab : styles.inactiveTab)
            }}
          >
            <span style={styles.tabIcon}>⭐</span>
            구독권 구매
          </button>
        </div>

        {/* 포인트 충전 섹션 */}
        {activeTab === 'point' && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>💎 포인트 상품</h3>
            <div style={styles.optionsGrid}>
              {pointOptions.map(({ point, price, bonus }) => (
                <div
                  key={point}
                  onClick={() => handleItemSelect({ point, price, type: 'point' })}
                  style={{
                    ...styles.optionCard,
                    ...(selectedAmount?.point === point ? styles.selectedCard : {})
                  }}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.pointAmount}>{point.toLocaleString()}P</div>
                    {bonus > 0 && (
                      <div style={styles.bonusTag}>+{bonus.toLocaleString()}P</div>
                    )}
                  </div>
                  <div style={styles.priceSection}>
                    <div style={styles.priceAmount}>{price.toLocaleString()}원</div>
                    {bonus > 0 && (
                      <div style={styles.originalPrice}>
                        ({(price + bonus).toLocaleString()}원 상당)
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 구독권 구매 섹션 */}
        {activeTab === 'subscription' && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>🌟 구독권</h3>
            <div style={styles.subscriptionContainer}>
              <div
                onClick={() => handleItemSelect({ 
                  name: subscriptionOption.name,
                  price: subscriptionOption.price,
                  type: 'subscription'
                })}
                style={{
                  ...styles.subscriptionCard,
                  ...(selectedAmount?.type === 'subscription' ? styles.selectedCard : {})
                }}
              >
                <div style={styles.subscriptionHeader}>
                  <div style={styles.subscriptionBadge}>PREMIUM</div>
                  <h4 style={styles.subscriptionName}>{subscriptionOption.name}</h4>
                  <div style={styles.subscriptionDuration}>{subscriptionOption.duration}</div>
                </div>
                
                <div style={styles.subscriptionPrice}>
                  {subscriptionOption.price.toLocaleString()}원
                </div>
                
                <div style={styles.benefitsList}>
                  {subscriptionOption.benefits.map((benefit, index) => (
                    <div key={index} style={styles.benefitItem}>
                      <span style={styles.benefitIcon}>✨</span>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 결제 수단 선택 */}
        {selectedAmount && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>💳 결제 수단</h3>
            <div style={styles.paymentMethods}>
              <button
                onClick={() => setPaymentMethod('card')}
                style={{
                  ...styles.paymentMethod,
                  ...(paymentMethod === 'card' ? styles.selectedPayment : {})
                }}
              >
                <span style={styles.paymentIcon}>💳</span>
                카드 결제
              </button>
              <button
                onClick={() => setPaymentMethod('bank')}
                style={{
                  ...styles.paymentMethod,
                  ...(paymentMethod === 'bank' ? styles.selectedPayment : {})
                }}
              >
                <span style={styles.paymentIcon}>🏦</span>
                계좌 이체
              </button>
            </div>
          </div>
        )}

        {/* 결제 정보 입력 */}
        {selectedAmount && paymentMethod && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📝 결제 정보</h3>
            <div style={styles.paymentFormContainer}>
              <PaymentForm
                method={paymentMethod}
                amount={selectedAmount}
              />
            </div>
          </div>
        )}

        {/* 선택된 상품 요약 */}
        {selectedAmount && (
          <div style={styles.summaryCard}>
            <h4 style={styles.summaryTitle}>📋 선택된 상품</h4>
            {activeTab === 'point' ? (
              <div style={styles.summaryContent}>
                <div style={styles.summaryRow}>
                  <span>포인트</span>
                  <span style={styles.summaryValue}>{selectedAmount.point?.toLocaleString()}P</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>결제 금액</span>
                  <span style={styles.summaryPrice}>{selectedAmount.price?.toLocaleString()}원</span>
                </div>
              </div>
            ) : (
              <div style={styles.summaryContent}>
                <div style={styles.summaryRow}>
                  <span>구독권</span>
                  <span style={styles.summaryValue}>{selectedAmount.name}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>결제 금액</span>
                  <span style={styles.summaryPrice}>{selectedAmount.price?.toLocaleString()}원</span>
                </div>
              </div>
            )}
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
    marginBottom: '2rem'
  },
  currentPointsCard: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem 2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  },
  pointsIcon: {
    fontSize: '2.5rem'
  },
  pointsInfo: {
    textAlign: 'left'
  },
  pointsLabel: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '0.3rem'
  },
  pointsAmount: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  tabContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '0.5rem',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)'
  },
  tab: {
    flex: 1,
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '15px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  activeTab: {
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    color: '#1a1a2e',
    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
  },
  inactiveTab: {
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  tabIcon: {
    fontSize: '1.2rem'
  },
  section: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  optionCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '1.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  selectedCard: {
    background: 'rgba(255, 215, 0, 0.1)',
    border: '2px solid #FFD700',
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(255, 215, 0, 0.2)'
  },
  cardHeader: {
    marginBottom: '1rem'
  },
  pointAmount: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem'
  },
  bonusTag: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  priceSection: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '1rem'
  },
  priceAmount: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.3rem'
  },
  originalPrice: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'line-through'
  },
  subscriptionContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  subscriptionCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    maxWidth: '400px',
    width: '100%'
  },
  subscriptionHeader: {
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  subscriptionBadge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    padding: '0.3rem 1rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  subscriptionName: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 0.5rem 0'
  },
  subscriptionDuration: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1rem'
  },
  subscriptionPrice: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  benefitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.8rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  benefitIcon: {
    fontSize: '1.2rem'
  },
  paymentMethods: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  paymentMethod: {
    padding: '1.2rem 2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backdropFilter: 'blur(10px)'
  },
  selectedPayment: {
    background: 'rgba(255, 215, 0, 0.1)',
    border: '2px solid #FFD700',
    color: '#FFD700'
  },
  paymentIcon: {
    fontSize: '1.3rem'
  },
  paymentFormContainer: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '2rem',
    borderRadius: '20px'
  },
  summaryCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1.5rem',
    borderRadius: '20px',
    marginTop: '2rem'
  },
  summaryTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.3rem',
    fontWeight: 'bold'
  },
  summaryContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  summaryValue: {
    fontWeight: 'bold',
    color: 'white'
  },
  summaryPrice: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }
};

export default PointChargePage;
