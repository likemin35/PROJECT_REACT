import React, { useState } from 'react';

function PaymentForm({ method, amount }) {
  const [cardCompany, setCardCompany] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');

  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleSubmit = () => {
    if (method === 'card') {
      if (!cardCompany || !cardNumber || !expiryMonth || !expiryYear || !cvc) {
        alert('모든 카드 정보를 입력해주세요.');
        return;
      }
      alert(`${amount.point}P 충전 완료 (카드 결제)`);
    } else if (method === 'bank') {
      if (!bankName || !accountNumber) {
        alert('모든 계좌 정보를 입력해주세요.');
        return;
      }
      alert(`${amount.point}P 충전 완료 (계좌이체)`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {method === 'card' ? (
        <>
          <label>카드사 선택</label>
          <select value={cardCompany} onChange={(e) => setCardCompany(e.target.value)}>
            <option value="">선택하세요</option>
            <option value="삼성카드">삼성카드</option>
            <option value="국민카드">국민카드</option>
            <option value="롯데카드">롯데카드</option>
          </select>

          <label>카드번호</label>
          <input
            type="text"
            placeholder="1234-5678-1234-5678"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <label>유효기간</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)}>
              <option value="">월</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={String(i + 1).padStart(2, '0')}>
                  {String(i + 1).padStart(2, '0')}
                </option>
              ))}
            </select>
            <select value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)}>
              <option value="">년</option>
              {[...Array(10)].map((_, i) => {
                const year = new Date().getFullYear() + i;
                return (
                  <option key={year} value={year}>{year}</option>
                );
              })}
            </select>
          </div>

          <label>CVC</label>
          <input
            type="text"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
          />
        </>
      ) : (
        <>
          <label>은행명</label>
          <select value={bankName} onChange={(e) => setBankName(e.target.value)}>
            <option value="">선택하세요</option>
            <option value="국민은행">국민은행</option>
            <option value="농협은행">농협은행</option>
            <option value="기업은행">기업은행</option>
            <option value="하나은행">하나은행</option>
            <option value="카카오뱅크">카카오뱅크</option>
          </select>

          <label>계좌번호</label>
          <input
            type="text"
            placeholder="예: 123-456-789012"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </>
      )}

      <button
        onClick={handleSubmit}
        style={{
          marginTop: '1rem',
          padding: '0.6rem',
          backgroundColor: '#ff7043',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        결제하기
      </button>
    </div>
  );
}

export default PaymentForm;
