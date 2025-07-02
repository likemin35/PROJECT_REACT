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
    alert(`도서 대여가 완료되었습니다! 3일간 이용하실 수 있습니다.`);
    // 읽기 페이지로 이동
    navigate(`/read/${bookId}`);
  };

  const handleSubscriptionRead = () => {
    if (!hasSubscription) {
      setShowSubscriptionModal(true);
      return;
    }
    alert('보라패스로 도서를 시작합니다! 무제한으로 이용하세요.');
    // 읽기 페이지로 이동
    navigate(`/read/${bookId}`);
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
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              backgroundColor: '#f9f5fb', 
              borderRadius: '8px', 
              border: '1px solid #e1bee7' 
            }}>
              <p style={{ margin: '0.5rem 0', fontWeight: '600', color: '#000' }}>현재 보유 포인트: {userPoint.toLocaleString()}P</p>
              <p style={{ margin: '0.5rem 0', fontWeight: '600', color: '#000' }}>보라패스 상태: {hasSubscription ? '구독중' : '미구독'}</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#8E24AA' }}>줄거리</h2>
          <p style={{ lineHeight: '1.6', marginTop: '1rem' }}>{book.summary}</p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#8E24AA', marginBottom: '1.5rem' }}>읽기 옵션</h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleSubscriptionRead} 
              style={{ 
                backgroundColor: '#8E24AA', 
                color: '#ffffff', 
                padding: '1.2rem 2rem', 
                borderRadius: '12px', 
                border: 'none', 
                cursor: 'pointer', 
                flex: 1,
                fontSize: '1.1rem',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(142, 36, 170, 0.3)',
                transition: 'all 0.3s ease',
                minWidth: '200px'
              }}
            >
              {hasSubscription ? '보라패스로 읽기 (무제한)' : '보라패스로 읽기'}
              <br />
              <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                {hasSubscription ? '즉시 이용 가능' : '구독 필요'}
              </span>
            </button>
            <button 
              onClick={handlePointRead} 
              style={{ 
                backgroundColor: userPoint < book.price ? '#cccccc' : '#8E24AA', 
                color: '#ffffff', 
                padding: '1.2rem 2rem', 
                borderRadius: '12px', 
                border: 'none', 
                cursor: userPoint < book.price ? 'not-allowed' : 'pointer', 
                flex: 1,
                fontSize: '1.1rem',
                fontWeight: '600',
                boxShadow: userPoint < book.price ? 'none' : '0 4px 12px rgba(142, 36, 170, 0.3)',
                transition: 'all 0.3s ease',
                minWidth: '200px'
              }}
            >
              포인트로 읽기
              <br />
              <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                {book.price.toLocaleString()}P (3일간 이용)
              </span>
            </button>
          </div>
        </div>

        {showPointModal && (
          <div style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{ 
              backgroundColor: '#ffffff',
              borderRadius: '16px', 
              padding: '2rem',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#8E24AA', marginBottom: '1.5rem' }}>포인트 결제 확인</h3>
              <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong>도서:</strong> {book.title}</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>저자:</strong> {book.author}</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>대여 기간:</strong> 3일</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>사용 포인트:</strong> {book.price.toLocaleString()}P</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>잔여 포인트:</strong> {(userPoint - book.price).toLocaleString()}P</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={confirmPointRead} 
                  style={{ 
                    flex: 1,
                    backgroundColor: '#8E24AA', 
                    color: '#ffffff', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  읽기 시작
                </button>
                <button 
                  onClick={() => setShowPointModal(false)} 
                  style={{ 
                    flex: 1,
                    padding: '1rem', 
                    borderRadius: '8px', 
                    border: '1px solid #8E24AA', 
                    backgroundColor: '#ffffff', 
                    color: '#8E24AA',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {showSubscriptionModal && (
          <div style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{ 
              backgroundColor: '#ffffff',
              borderRadius: '16px', 
              padding: '2rem',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#8E24AA', marginBottom: '1.5rem' }}>보라패스 구독 안내</h3>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.5' }}>
                보라패스를 구독하면 모든 도서를 무제한으로 읽을 수 있습니다.
              </p>
              <div style={{ 
                backgroundColor: '#f9f5fb',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                <p style={{ margin: '0.3rem 0' }}>✓ 무제한 도서 대여</p>
                <p style={{ margin: '0.3rem 0' }}>✓ 광고 제거</p>
                <p style={{ margin: '0.3rem 0' }}>✓ 우선 예약 서비스</p>
                <p style={{ margin: '0.3rem 0', fontWeight: 'bold', color: '#8E24AA' }}>월 9,900원</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={confirmSubscription} 
                  style={{ 
                    flex: 1,
                    backgroundColor: '#8E24AA', 
                    color: '#ffffff', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  구독하러 가기
                </button>
                <button 
                  onClick={() => setShowSubscriptionModal(false)} 
                  style={{ 
                    flex: 1,
                    padding: '1rem', 
                    borderRadius: '8px', 
                    border: '1px solid #8E24AA', 
                    backgroundColor: '#ffffff', 
                    color: '#8E24AA',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  나중에
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookRentalPage;