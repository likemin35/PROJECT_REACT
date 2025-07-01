import React, { useState } from 'react';
import PointOptionButton from '../components/PointOptionButton';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import PaymentForm from '../components/PaymentForm';

function PointChargePage() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>포인트 충전</h2>

      <section>
        <h4>포인트 상품 선택</h4>
        <PointOptionButton
          options={[
            { point: 5000, price: 5000 },
            { point: 10000, price: 10000 },
            { point: 22000, price: 20000 },
          ]}
          selected={selectedAmount}
          onSelect={setSelectedAmount}
        />
      </section>

      {selectedAmount && (
        <>
          <section style={{ marginTop: '2rem' }}>
            <h4>결제 수단 선택</h4>
            <PaymentMethodSelector
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />
          </section>

          {paymentMethod && (
            <section style={{ marginTop: '2rem' }}>
              <h4>결제 정보 입력</h4>
              <PaymentForm
                method={paymentMethod}
                amount={selectedAmount}
              />
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default PointChargePage;
