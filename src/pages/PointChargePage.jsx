import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PaymentForm from '../components/PaymentForm';

function PointChargePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('point');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(12500);

  const pointOptions = [
    { point: 5000, price: 5000, bonus: 0 },
    { point: 10000, price: 10000, bonus: 0 },
    { point: 22000, price: 20000, bonus: 2000 },
    { point: 55000, price: 50000, bonus: 5000 }
  ];

  const subscriptionOption = {
    name: '보라패스',
    duration: '1개월',
    price: 9900,
    benefits: ['무제한 도서 대여', '광고 제거', '우선 예약 서비스']
  };

  const handleItemSelect = (item) => {
    setSelectedAmount(item);
    setPaymentMethod(null);
  };

  const resetSelection = () => {
    setSelectedAmount(null);
    setPaymentMethod(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', color: '#000000', fontFamily: 'sans-serif' }}>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ color: '#8E24AA', fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>포인트 충전 & 구독</h1>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => { setActiveTab('point'); resetSelection(); }}
            style={{ flex: 1, padding: '1rem', borderRadius: '8px', backgroundColor: activeTab === 'point' ? '#8E24AA' : '#eeeeee', color: activeTab === 'point' ? '#ffffff' : '#333', border: 'none', fontWeight: 'bold' }}>포인트 충전</button>
          <button onClick={() => { setActiveTab('subscription'); resetSelection(); }}
            style={{ flex: 1, padding: '1rem', borderRadius: '8px', backgroundColor: activeTab === 'subscription' ? '#8E24AA' : '#eeeeee', color: activeTab === 'subscription' ? '#ffffff' : '#333', border: 'none', fontWeight: 'bold' }}>구독권 구매</button>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#8E24AA', marginBottom: '1rem' }}>보유 포인트</h2>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{currentPoints.toLocaleString()} P</p>
        </div>

        {activeTab === 'point' && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>포인트 상품 선택</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {pointOptions.map(opt => (
                <div key={opt.point} onClick={() => handleItemSelect({ point: opt.point, price: opt.price, type: 'point' })}
                  style={{ border: selectedAmount?.point === opt.point ? '2px solid #8E24AA' : '1px solid #ccc', borderRadius: '12px', padding: '1rem', cursor: 'pointer', backgroundColor: selectedAmount?.point === opt.point ? '#f3e5f5' : '#ffffff' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#8E24AA' }}>{opt.point.toLocaleString()}P</p>
                  <p>{opt.price.toLocaleString()}원</p>
                  {opt.bonus > 0 && <p style={{ color: '#8E24AA', fontSize: '0.9rem' }}>+{opt.bonus.toLocaleString()}P 보너스</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>구독권 선택</h3>
            <div onClick={() => handleItemSelect({ name: subscriptionOption.name, price: subscriptionOption.price, type: 'subscription' })}
              style={{ border: selectedAmount?.type === 'subscription' ? '2px solid #8E24AA' : '1px solid #ccc', borderRadius: '12px', padding: '1rem', backgroundColor: selectedAmount?.type === 'subscription' ? '#f3e5f5' : '#ffffff', cursor: 'pointer' }}>
              <h4 style={{ color: '#8E24AA', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{subscriptionOption.name}</h4>
              <p>{subscriptionOption.duration} / {subscriptionOption.price.toLocaleString()}원</p>
              <ul>
                {subscriptionOption.benefits.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </div>
        )}

        {selectedAmount && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>결제 수단</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setPaymentMethod('card')} style={{ flex: 1, padding: '1rem', borderRadius: '8px', backgroundColor: paymentMethod === 'card' ? '#8E24AA' : '#eeeeee', color: paymentMethod === 'card' ? '#ffffff' : '#333', border: 'none', fontWeight: 'bold' }}>카드 결제</button>
              <button onClick={() => setPaymentMethod('bank')} style={{ flex: 1, padding: '1rem', borderRadius: '8px', backgroundColor: paymentMethod === 'bank' ? '#8E24AA' : '#eeeeee', color: paymentMethod === 'bank' ? '#ffffff' : '#333', border: 'none', fontWeight: 'bold' }}>계좌 이체</button>
            </div>
          </div>
        )}

        {selectedAmount && paymentMethod && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>결제 정보 입력</h3>
            <PaymentForm method={paymentMethod} amount={selectedAmount} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PointChargePage;
