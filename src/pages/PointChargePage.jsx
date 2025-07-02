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
          <h1 style={styles.title}>충전 & 구독</h1>
          <p style={styles.subtitle}>포인트 충전 또는 구독권 구매를 선택하세요</p>
          
          {/* 현재 포인트 표시 */}
          <div style={styles.currentPointsCard}>
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
            구독권 구매
          </button>
        </div>

        {/* 포인트 충전 섹션 */}
        {activeTab === 'point' && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>포인트 상품</h3>
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
            <h3 style={styles.sectionTitle}>구독권</h3>
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
            <h3 style={styles.sectionTitle}>결제 수단</h3>
            <div style={styles.paymentMethods}>
              <button
                onClick={() => setPaymentMethod('card')}
                style={{
                  ...styles.paymentMethod,
                  ...(paymentMethod === 'card' ? styles.selectedPayment : {})
                }}
              >
                카드 결제
              </button>
              <button
                onClick={() => setPaymentMethod('bank')}
                style={{
                  ...styles.paymentMethod,
                  ...(paymentMethod === 'bank' ? styles.selectedPayment : {})
                }}
              >
                계좌 이체
              </button>
            </div>
          </div>
        )}

        {/* 결제 정보 입력 */}
        {selectedAmount && paymentMethod && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>결제 정보</h3>
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
            <h4 style={styles.summaryTitle}>선택된 상품</h4>
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
    background: '#ffffff',
    color: '#333333'
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
    color: '#8E24AA'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666666',
    marginBottom: '2rem'
  },
  currentPointsCard: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem 2rem',
    background: '#f9f5fb',
    border: '1px solid #e1bee7',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  },
  pointsInfo: {
    textAlign: 'center'
  },
  pointsLabel: {
    fontSize: '0.9rem',
    color: '#666666',
    marginBottom: '0.3rem'
  },
  pointsAmount: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#8E24AA'
  },
  tabContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    background: '#f8f8f8',
    padding: '0.5rem',
    borderRadius: '12px'
  },
  tab: {
    flex: 1,
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '8px',
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
    background: '#8E24AA',
    color: 'white',
    boxShadow: '0 4px 12px rgba(142, 36, 170, 0.2)'
  },
  inactiveTab: {
    background: '#eeeeee',
    color: '#666666',
    border: '1px solid #dddddd'
  },
  section: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  optionCard: {
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '1.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  },
  selectedCard: {
    background: '#f9f5fb',
    border: '2px solid #8E24AA',
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(142, 36, 170, 0.15)'
  },
  cardHeader: {
    marginBottom: '1rem'
  },
  pointAmount: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#8E24AA',
    marginBottom: '0.5rem'
  },
  bonusTag: {
    display: 'inline-block',
    background: '#8E24AA',
    color: 'white',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  priceSection: {
    borderTop: '1px solid #f0f0f0',
    paddingTop: '1rem'
  },
  priceAmount: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '0.3rem'
  },
  originalPrice: {
    fontSize: '0.9rem',
    color: '#999999',
    textDecoration: 'line-through'
  },
  subscriptionContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  subscriptionCard: {
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  },
  subscriptionHeader: {
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  subscriptionBadge: {
    display: 'inline-block',
    background: '#8E24AA',
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
    color: '#8E24AA',
    margin: '0 0 0.5rem 0'
  },
  subscriptionDuration: {
    color: '#666666',
    fontSize: '1rem'
  },
  subscriptionPrice: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333333',
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
    background: '#f9f5fb',
    borderRadius: '8px',
    color: '#333333'
  },
  paymentMethods: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  paymentMethod: {
    padding: '1.2rem 2rem',
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    color: '#333333',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minWidth: '150px',
    justifyContent: 'center'
  },
  selectedPayment: {
    background: '#f9f5fb',
    border: '2px solid #8E24AA',
    color: '#8E24AA'
  },
  paymentFormContainer: {
    background: 'white',
    border: '1px solid #e0e0e0',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  },
  summaryCard: {
    background: 'white',
    border: '1px solid #e0e0e0',
    padding: '1.5rem',
    borderRadius: '12px',
    marginTop: '2rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  },
  summaryTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#333333'
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
    borderBottom: '1px solid #f0f0f0'
  },
  summaryValue: {
    fontWeight: 'bold',
    color: '#333333'
  },
  summaryPrice: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#8E24AA'
  }
};

export default PointChargePage;