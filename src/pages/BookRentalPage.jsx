import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'; // ✅ Navbar 추가

const dummyBooks = [
  {
    id: 1,
    title: '해리포터',
    author: '조하민',
    rating: 9.2,
    price: 1000,
    image: '/assets/sample1.png',
  },
];

function BookRentalPage() {
  const { bookId } = useParams();
  const book = dummyBooks.find((b) => b.id === parseInt(bookId));

  const [rentedBooks, setRentedBooks] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [userPoint, setUserPoint] = useState(3000);
  const [isSubscriber, setIsSubscriber] = useState(false); // 비구독자

  if (!book) return <div style={{ padding: '2rem' }}>도서를 찾을 수 없습니다.</div>;

  const alreadyRented = rentedBooks[book.title] > 0;

  const handleRent = () => {
    const cost = isSubscriber ? 0 : book.price;

    if (userPoint < cost) {
      alert('포인트가 부족합니다.');
      return;
    }

    setUserPoint((prev) => prev - cost);
    setRentedBooks({ ...rentedBooks, [book.title]: 3 });
    setShowModal(false);
  };

  const decreaseRentalDays = () => {
    const updated = { ...rentedBooks };
    for (const key in updated) {
      if (updated[key] > 0) updated[key] -= 1;
    }
    setRentedBooks(updated);
  };

  return (
    <>
      {/* ✅ 네비게이션 바 */}
      <Navbar />

      <div style={styles.page}>
        <h2>도서 대여</h2>

        <div style={styles.bookBox}>
          <img src={book.image} alt={book.title} style={styles.thumbnail} />

          <div style={styles.bookInfo}>
            <h3 style={styles.title}>{book.title}</h3>
            <p style={styles.meta}>저자: {book.author}</p>
            <p style={styles.meta}>⭐ 평점: {book.rating}</p>
            <p style={styles.price}>{book.price.toLocaleString()}P</p>

            {alreadyRented ? (
              <p style={{ color: 'green', fontWeight: 'bold' }}>
                대여중 ({rentedBooks[book.title]}일 남음)
              </p>
            ) : (
              <button onClick={() => setShowModal(true)} style={styles.rentBtn}>
                대여하기
              </button>
            )}
          </div>
        </div>

        {/* ✅ 대여 모달 */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <p style={{ fontWeight: 'bold' }}>책을 대여하시겠습니까?</p>
              <p>보유 포인트: {userPoint.toLocaleString()}P</p>
              <p style={{ marginBottom: '1rem' }}>-{book.price.toLocaleString()}P</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={handleRent} style={styles.confirmBtn}>
                  대여하기
                </button>
                <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        <button onClick={decreaseRentalDays} style={{ marginTop: '2rem' }}>
          하루 경과 (테스트용)
        </button>
      </div>
    </>
  );
}

const styles = {
  page: {
    padding: '2rem',
    fontFamily: 'sans-serif',
  },
  bookBox: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginTop: '1rem',
  },
  thumbnail: {
    width: '150px',
    height: '210px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  bookInfo: {
    flex: 1,
  },
  title: {
    marginBottom: '0.5rem',
  },
  meta: {
    marginBottom: '0.3rem',
    color: '#555',
  },
  price: {
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: '0.5rem',
  },
  rentBtn: {
    padding: '0.5rem 1.2rem',
    backgroundColor: '#2a62ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  confirmBtn: {
    backgroundColor: '#2a62ff',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    color: 'black',
    border: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default BookRentalPage;
