import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentForm({ method, amount }) {
  const navigate = useNavigate();
  
  const [cardCompany, setCardCompany] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');

  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (method === 'card') {
      if (!cardCompany || !cardNumber || !expiryMonth || !expiryYear || !cvc) {
        alert('모든 카드 정보를 입력해주세요.');
        return;
      }
    } else if (method === 'bank') {
      if (!bankName || !accountNumber) {
        alert('모든 계좌 정보를 입력해주세요.');
        return;
      }
    }

    setIsProcessing(true);

    // 결제 처리 시뮬레이션
    setTimeout(() => {
      setIsProcessing(false);
      
      if (amount.type === 'point') {
        alert(`✨ ${amount.point}P 충전이 완료되었습니다! 🎉\n포인트를 활용해 다양한 도서를 즐겨보세요!`);
      } else if (amount.type === 'subscription') {
        alert(`🌟 ${amount.name} 구독이 완료되었습니다! ✨\n1개월간 무제한으로 이용하세요!`);
      }
      
      navigate('/main');
    }, 2500);
  };

  const isSubscription = amount.type === 'subscription';

  return (
    <div style={styles.container}>
      {/* 결제 요약 정보 */}
      <div style={styles.summaryBox}>
        <div style={styles.summaryHeader}>
          <h4 style={styles.summaryTitle}>
            <span style={styles.summaryIcon}>📋</span>
            결제 정보
          </h4>
        </div>
        
        <div style={styles.summaryContent}>
          {isSubscription ? (
            <>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>상품명</span>
                <span style={styles.summaryValue}>{amount.name}</span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>이용기간</span>
                <span style={styles.summaryValue}>1개월</span>
              </div>
              <div style={styles.benefitHighlight}>
                <span style={styles.benefitIcon}>🌟</span>
                프리미엄 무제한 이용
              </div>
            </>
          ) : (
            <>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>충전 포인트</span>
                <span style={styles.summaryValue}>{amount.point?.toLocaleString()}P</span>
              </div>
              <div style={styles.benefitHighlight}>
                <span style={styles.benefitIcon}>💎</span>
                즉시 사용 가능
              </div>
            </>
          )}
          
          <div style={styles.summaryTotal}>
            <span style={styles.totalLabel}>총 결제금액</span>
            <span style={styles.totalAmount}>{amount.price?.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      {/* 결제 폼 */}
      <div style={styles.formContainer}>
        <div style={styles.formHeader}>
          <h4 style={styles.formTitle}>
            <span style={styles.formIcon}>
              {method === 'card' ? '💳' : '🏦'}
            </span>
            {method === 'card' ? '카드 정보 입력' : '계좌 정보 입력'}
          </h4>
        </div>

        <div style={styles.formContent}>
          {method === 'card' ? (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>🏢</span>
                  카드사
                </label>
                <select 
                  value={cardCompany} 
                  onChange={(e) => setCardCompany(e.target.value)}
                  style={styles.select}
                >
                  <option value="">카드사를 선택하세요</option>
                  <option value="삼성카드">삼성카드</option>
                  <option value="국민카드">국민카드</option>
                  <option value="롯데카드">롯데카드</option>
                  <option value="현대카드">현대카드</option>
                  <option value="신한카드">신한카드</option>
                  <option value="우리카드">우리카드</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>💳</span>
                  카드번호
                </label>
                <input
                  type="text"
                  placeholder="1234-5678-1234-5678"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  style={styles.input}
                  maxLength="19"
                />
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <span style={styles.labelIcon}>📅</span>
                    유효기간
                  </label>
                  <div style={styles.expiryRow}>
                    <select 
                      value={expiryMonth} 
                      onChange={(e) => setExpiryMonth(e.target.value)}
                      style={{ ...styles.select, flex: 1 }}
                    >
                      <option value="">월</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}월
                        </option>
                      ))}
                    </select>
                    <select 
                      value={expiryYear} 
                      onChange={(e) => setExpiryYear(e.target.value)}
                      style={{ ...styles.select, flex: 1 }}
                    >
                      <option value="">년</option>
                      {[...Array(10)].map((_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <option key={year} value={year}>{year}년</option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <span style={styles.labelIcon}>🔒</span>
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    style={styles.input}
                    maxLength="4"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>🏦</span>
                  은행명
                </label>
                <select 
                  value={bankName} 
                  onChange={(e) => setBankName(e.target.value)}
                  style={styles.select}
                >
                  <option value="">은행을 선택하세요</option>
                  <option value="국민은행">국민은행</option>
                  <option value="농협은행">농협은행</option>
                  <option value="기업은행">기업은행</option>
                  <option value="하나은행">하나은행</option>
                  <option value="신한은행">신한은행</option>
                  <option value="우리은행">우리은행</option>
                  <option value="SC제일은행">SC제일은행</option>
                  <option value="카카오뱅크">카카오뱅크</option>
                  <option value="토스뱅크">토스뱅크</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>🔢</span>
                  계좌번호
                </label>
                <input
                  type="text"
                  placeholder="계좌번호를 입력하세요 (예: 123-456-789012)"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  style={styles.input}
                />
              </div>
            </>
          )}

          <div style={styles.securityNotice}>
            <span style={styles.securityIcon}>🔐</span>
            <span style={styles.securityText}>
              모든 결제 정보는 SSL로 암호화되어 안전하게 처리됩니다
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            style={{
              ...styles.submitButton,
              ...(isProcessing ? styles.processingButton : {})
            }}
          >
            {isProcessing ? (
              <>
                <span style={styles.loadingSpinner}>⏳</span>
                <span style={styles.loadingText}>결제 처리 중...</span>
                <div style={styles.processingBar}>
                  <div style={styles.processingFill}></div>
                </div>
              </>
            ) : (
              <>
                <span style={styles.buttonIcon}>💳</span>
                <span style={styles.buttonText}>
                  {amount.price?.toLocaleString()}원 결제하기
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  summaryBox: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  },
  summaryHeader: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  summaryTitle: {
    margin: 0,
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem'
  },
  summaryIcon: {
    fontSize: '1.5rem'
  },
  summaryContent: {
    padding: '1.5rem'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    fontSize: '1.1rem'
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.8)'
  },
  summaryValue: {
    fontWeight: 'bold',
    color: 'white'
  },
  benefitHighlight: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '1rem',
    background: 'rgba(255, 215, 0, 0.1)',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    color: '#FFD700',
    fontSize: '1rem',
    fontWeight: '600'
  },
  benefitIcon: {
    fontSize: '1.3rem'
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '2px solid rgba(255, 215, 0, 0.3)',
    fontSize: '1.3rem',
    fontWeight: 'bold'
  },
  totalLabel: {
    color: 'white'
  },
  totalAmount: {
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '1.5rem'
  },
  formContainer: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  },
  formHeader: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  formTitle: {
    margin: 0,
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem'
  },
  formIcon: {
    fontSize: '1.5rem'
  },
  formContent: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    flex: 1
  },
  label: {
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  labelIcon: {
    fontSize: '1.2rem'
  },
  input: {
    padding: '1.2rem 1.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none'
  },
  select: {
    padding: '1.2rem 1.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    cursor: 'pointer'
  },
  row: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'end'
  },
  expiryRow: {
    display: 'flex',
    gap: '0.5rem'
  },
  securityNotice: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '1rem',
    background: 'rgba(76, 175, 80, 0.1)',
    border: '1px solid rgba(76, 175, 80, 0.3)',
    borderRadius: '12px',
    fontSize: '0.95rem',
    color: '#81C784'
  },
  securityIcon: {
    fontSize: '1.2rem'
  },
  securityText: {
    flex: 1
  },
  submitButton: {
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    padding: '1.5rem 2rem',
    borderRadius: '16px',
    border: 'none',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
    boxShadow: '0 6px 20px rgba(142, 36, 170, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    minHeight: '60px'
  },
  processingButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    cursor: 'not-allowed',
    boxShadow: 'none',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  buttonIcon: {
    fontSize: '1.5rem'
  },
  buttonText: {
    fontSize: '1.3rem'
  },
  loadingSpinner: {
    fontSize: '1.8rem',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  processingBar: {
    width: '200px',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  processingFill: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    animation: 'processing 2s ease-in-out infinite'
  }
};

// CSS 애니메이션 및 호버 효과 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes processing {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
  }
  
  .payment-input:focus {
    border-color: rgba(142, 36, 170, 0.5);
    box-shadow: 0 0 0 3px rgba(142, 36, 170, 0.1);
  }
  
  .payment-select:focus {
    border-color: rgba(142, 36, 170, 0.5);
    box-shadow: 0 0 0 3px rgba(142, 36, 170, 0.1);
  }
  
  .submit-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(142, 36, 170, 0.5);
  }
`;
document.head.appendChild(styleSheet);

export default PaymentForm;
