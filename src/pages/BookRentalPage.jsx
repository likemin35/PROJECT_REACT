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
  const [hasSubscription, setHasSubscription] = useState(false);
  const [showPointModal, setShowPointModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  if (!book) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#000000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Navbar />
        <h2>도서를 찾을 수 없습니다</h2>
        <p>요청하신 도서 정보를 찾을 수 없습니다.</p>
        <button onClick={() => navigate('/main')} style={{ backgroundColor: '#8E24AA', color: '#ffffff', padding: '1rem 2rem', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  const handlePointRead = () => {
    if (userPoint < book.price) {
      alert('보유 포인트가 부족합니다. 포인트를 충전해주세요.');
      return;
    }
    setShowPointModal(true);
  };

  const confirmPointRead = () => {
    setUserPoint(prev => prev - book.price);
    setShowPointModal(false);
    alert('도서 대여가 완료되었습니다! 3일간 이용하실 수 있습니다.');
  };

  const handleSubscriptionRead = () => {
    if (!hasSubscription) {
      setShowSubscriptionModal(true);
      return;
    }
    alert('보라패스로 도서를 시작합니다! 무제한으로 이용하세요.');
  };

  const confirmSubscription = () => {
    setShowSubscriptionModal(false);
    navigate('/charge');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'sans-serif' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <img src={book.image} alt={book.title} style={{ width: '250px', height: '350px', objectFit: 'cover', borderRadius: '16px', border: '1px solid #8E24AA' }} />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8E24AA' }}>{book.title}</h1>
            <p style={{ margin: '0.5rem 0' }}>저자: {book.author}</p>
            <p style={{ margin: '0.5rem 0' }}>조회수: {book.views.toLocaleString()}회</p>
            <p style={{ margin: '0.5rem 0' }}>대여가: {book.price.toLocaleString()}P</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#8E24AA' }}>줄거리</h2>
          <p>{book.summary}</p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#8E24AA' }}>읽기 옵션</h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button onClick={handleSubscriptionRead} style={{ backgroundColor: '#8E24AA', color: '#ffffff', padding: '1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', flex: 1 }}>
              보라패스로 읽기
            </button>
            <button onClick={handlePointRead} style={{ backgroundColor: userPoint < book.price ? '#cccccc' : '#8E24AA', color: '#ffffff', padding: '1rem', borderRadius: '8px', border: 'none', cursor: userPoint < book.price ? 'not-allowed' : 'pointer', flex: 1 }}>
              포인트로 읽기 ({book.price.toLocaleString()}P)
            </button>
          </div>
        </div>

        {showPointModal && (
          <div style={{ marginTop: '2rem', border: '1px solid #8E24AA', borderRadius: '12px', padding: '1rem' }}>
            <h3 style={{ color: '#8E24AA' }}>포인트 결제 확인</h3>
            <p>도서: {book.title}</p>
            <p>대여 기간: 3일</p>
            <p>사용 포인트: {book.price.toLocaleString()}P</p>
            <p>잔여 포인트: {(userPoint - book.price).toLocaleString()}P</p>
            <button onClick={confirmPointRead} style={{ backgroundColor: '#8E24AA', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', marginRight: '1rem' }}>확인</button>
            <button onClick={() => setShowPointModal(false)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #8E24AA', backgroundColor: '#ffffff', color: '#8E24AA' }}>취소</button>
          </div>
        )}

        {showSubscriptionModal && (
          <div style={{ marginTop: '2rem', border: '1px solid #8E24AA', borderRadius: '12px', padding: '1rem' }}>
            <h3 style={{ color: '#8E24AA' }}>보라패스 구독 안내</h3>
            <p>보라패스를 구독하면 모든 도서를 무제한으로 읽을 수 있습니다.</p>
            <button onClick={confirmSubscription} style={{ backgroundColor: '#8E24AA', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', marginRight: '1rem' }}>구독하러 가기</button>
            <button onClick={() => setShowSubscriptionModal(false)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #8E24AA', backgroundColor: '#ffffff', color: '#8E24AA' }}>나중에</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookRentalPage;
