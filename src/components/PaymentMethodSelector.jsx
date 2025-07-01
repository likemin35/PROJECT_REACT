import React from 'react';

function PaymentMethodSelector({ selected, onSelect }) {
  const methods = ['신용카드', '계좌이체'];

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {methods.map((method) => (
        <button
          key={method}
          onClick={() => onSelect(method)}
          style={{
            padding: '0.75rem 1.5rem',
            background: selected === method ? '#dff' : '#fff',
            border: selected === method ? '2px solid blue' : '1px solid gray',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {method}
        </button>
      ))}
    </div>
  );
}

export default PaymentMethodSelector;
