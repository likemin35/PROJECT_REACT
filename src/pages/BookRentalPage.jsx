import React, { useState } from 'react';

function BookRentalPage() {
  const books = ['도서 1', '도서 2', '도서 3'];

  const [rentedBooks, setRentedBooks] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSubscriber, setIsSubscriber] = useState(false); // 비구독자
  const [userPoint, setUserPoint] = useState(3000); // 유저 포인트
  const [message, setMessage] = useState('');

  const handleRent = (book) => {
    const cost = isSubscriber ? 0 : 1000;

    if (userPoint < cost) {
      alert('포인트가 부족합니다.');
      return;
    }

    setUserPoint((prev) => prev - cost);
    setRentedBooks({ ...rentedBooks, [book]: 3 }); // 3일 남음
    setSelectedBook(null);
    setMessage(`"${book}" 대여 성공!`);
  };

  const decreaseRentalDays = () => {
    const updated = { ...rentedBooks };
    for (const key in updated) {
      if (updated[key] > 0) updated[key] -= 1;
    }
    setRentedBooks(updated);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>도서 대여</h2>
      <p>보유 포인트: {userPoint.toLocaleString()}P</p>
      <p>회원 상태: {isSubscriber ? '정기 구독자' : '비구독자'}</p>

      {books.map((book) => (
        <div
          key={book}
          style={{
            border: '1px solid gray',
            padding: '1rem',
            marginBottom: '1rem',
            position: 'relative',
          }}
        >
          <strong>{book}</strong>
          <div style={{ float: 'right' }}>
            {rentedBooks[book] > 0 ? (
              <span>대여중 ({rentedBooks[book]}일 남음)</span>
            ) : (
              <button onClick={() => setSelectedBook(book)}>대여하기</button>
            )}
          </div>

          {/* 모달처럼 보이는 박스 */}
          {selectedBook === book && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: '#f9f9f9',
                border: '1px solid #ccc',
                padding: '1rem',
                zIndex: 1,
                marginTop: '0.5rem',
              }}
            >
              <p>정기구독 대여하기</p>
              <small>
                -{isSubscriber ? 0 : 1000}포인트
              </small>
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={() => handleRent(book)}>대여하기</button>
                <button onClick={() => setSelectedBook(null)} style={{ marginLeft: '0.5rem' }}>
                  취소
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {message && <p style={{ color: 'green' }}>{message}</p>}

      <button onClick={decreaseRentalDays} style={{ marginTop: '2rem' }}>
        하루 경과 (테스트용)
      </button>
    </div>
  );
}

export default BookRentalPage;
