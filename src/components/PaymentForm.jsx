import React, { useState } from 'react';

function PaymentForm({ method, amount }) {
  const [form, setForm] = useState({
    cardCompany: '',
    cardNumber: '',
    csv: '',
    bank: '',
    account: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (method === '신용카드') {
      alert('결제 완료!');
    } else {
      alert('입금 시 자동으로 결제가 확정됩니다.');
    }
  };

  return (
    <div>
      {method === '신용카드' ? (
        <>
          <input
            type="text"
            name="cardCompany"
            placeholder="카드사"
            value={form.cardCompany}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="카드번호"
            value={form.cardNumber}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <input
            type="text"
            name="csv"
            placeholder="CSV 번호"
            value={form.csv}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
          />
        </>
      ) : (
        <>
          <input
            type="text"
            name="bank"
            placeholder="은행명"
            value={form.bank}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
          />
          <input
            type="text"
            name="account"
            placeholder="계좌번호"
            value={form.account}
            onChange={handleChange}
            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
          />
        </>
      )}

      <button onClick={handleSubmit}>
        {amount?.point.toLocaleString()}P 결제하기
      </button>
    </div>
  );
}

export default PaymentForm;
