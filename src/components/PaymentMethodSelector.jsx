import React from 'react';

function PaymentMethodSelector({ selected, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <button
        onClick={() => onSelect('card')}
        style={selected === 'card' ? selectedBtnStyle : btnStyle}
      >
        카드 결제
      </button>
      <button
        onClick={() => onSelect('bank')}
        style={selected === 'bank' ? selectedBtnStyle : btnStyle}
      >
        계좌 이체
      </button>
    </div>
  );
}

const btnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#e0e0e0',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const selectedBtnStyle = {
  ...btnStyle,
  backgroundColor: '#ff7043',
  color: 'white',
  fontWeight: 'bold',
};

export default PaymentMethodSelector;
