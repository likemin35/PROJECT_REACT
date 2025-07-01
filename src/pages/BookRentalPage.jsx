import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const dummyBooks = [
  { id: 1, title: '해리포터', author: '조하민' },
  { id: 2, title: '미움받을용기', author: '이원준' },
  { id: 3, title: '하하엄마처럼 하하하', author: '장우진' },
  // 필요 시 나머지도 추가 가능
];

function BookRentalPage() {
  const { bookId } = useParams(); // URL에서 책 ID 가져오기
  const book = dummyBooks.find((b) => b.id === parseInt(bookId));

  const [rentedBooks, setRentedBooks] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSubscriber, setIsSubscriber] = useState(false); // 비구독자
  const [userPoint, setUserPoint] = useState(3000); // 유저 포인트
  const [message, setMessage] = useState('');

  const handleRent = (bookTitle) => {
    const cost = isSubscriber ? 0 : 1000;

    if (userPoint < cost) {
      alert('포인트가 부족합니다.');
      return;
    }

    setUserPoint((prev) => prev - cost);
    setRentedBooks({ ...rentedBooks, [bookTitle]: 3 });
    setSelectedBook(null);
    setMessage(`"${bookTitle}" 대여 성공!`);
  };

  const decreaseRentalDays = () => {
    const updated = { ...rentedBooks };
    for (const key in updated) {
      if (updated[key] > 0) updated[key] -= 1;
    }
    setRentedBooks(updated);
  };

  if (!book) {
    return <div style={{ padding: '2rem' }}>도서를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>도서 대여</h2>
      <p>보유 포인트: {userPoint.toLocaleString()}P</p>
      <p>회원 상태: {isSubscriber ? '정기 구독자' : '비구독자'}</p>

      <div
        style={{
          border: '1px solid gray',
          padding: '1rem',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        <strong>{book.title}</strong> <span style={{ color: 'gray' }}>({book.author})</span>
        <div style={{ float: 'right' }}>
          {rentedBooks[book.title] > 0 ? (
            <span>대여중 ({rentedBooks[book.title]}일 남음)</span>
          ) : (
            <button onClick={() => setSelectedBook(book.title)}>대여하기</button>
          )}
        </div>

        {selectedBook === book.title && (
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
            <small>-{isSubscriber ? 0 : 1000}포인트</small>
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={() => handleRent(book.title)}>대여하기</button>
              <button onClick={() => setSelectedBook(null)} style={{ marginLeft: '0.5rem' }}>
                취소
              </button>
            </div>
          </div>
        )}
      </div>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      <button onClick={decreaseRentalDays} style={{ marginTop: '2rem' }}>
        하루 경과 (테스트용)
      </button>
    </div>
  );
}

export default BookRentalPage;
