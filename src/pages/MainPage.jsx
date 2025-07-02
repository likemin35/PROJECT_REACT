import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const allBooks = [
  { id: 1, title: '보라공주와 일곱 난쟁이', author: '곽보라', price: 9700, views: 13240, image: '/assets/sample1.png' },
  { id: 2, title: '해리포터', author: '조하민', price: 12000, views: 15420, image: '/assets/sample1.png' },
  { id: 3, title: '미움받을용기', author: '이원준', price: 9800, views: 8830, image: '/assets/sample1.png' },
  { id: 4, title: '하하엄마처럼 하하하', author: '장우진', price: 10500, views: 12650, image: '/assets/sample1.png' },
  { id: 5, title: '정준하장가가기40일대작전', author: '김영진', price: 8800, views: 6420, image: '/assets/sample1.png' },
  { id: 6, title: '이기적유전자', author: '조은형', price: 11200, views: 21100, image: '/assets/sample1.png' },
  { id: 7, title: '20대 투자에 미쳐라', author: '정병찬', price: 9900, views: 18750, image: '/assets/sample1.png' },
  { id: 8, title: '개미', author: '이승환', price: 10800, views: 9340, image: '/assets/sample1.png' },
  { id: 9, title: '수박은 장마철 이전이 맛있다', author: '윤성열', price: 9900, views: 7890, image: '/assets/sample1.png' },
  { id: 10, title: '명탐정코난', author: '한기영', price: 11500, views: 24680, image: '/assets/sample1.png' },
];

const bookData = {
  로맨스: allBooks,
  스릴러: allBooks,
  SF: allBooks,
  에세이: allBooks,
  자기계발: allBooks,
};

function MainPage() {
  const navigate = useNavigate();
  const categories = Object.keys(bookData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showWritingModal, setShowWritingModal] = useState(false);

  return (
    <div style={styles.pageContainer}>
      <Navbar />

      <div style={styles.container}>
        
        <div style={styles.tabContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.tab,
                ...(activeCategory === cat ? styles.activeTab : styles.inactiveTab)
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={styles.booksList}>
          {bookData[activeCategory].map((book, index) => (
            <div key={`${book.id}-${index}`} style={styles.bookRow} className="book-row">
              <div style={styles.rankBadge}>{index + 1}</div>
              <div style={styles.bookImageContainer}>
                <img src={book.image} alt={book.title} style={styles.bookImage} className="book-image" />
              </div>
              <div style={styles.bookInfo}>
                <h3 style={styles.bookTitle}>{book.title}</h3>
                <p style={styles.bookAuthor}>{book.author}</p>
                <div style={styles.bookMeta}>
                  <span style={styles.bookPrice}>{book.price.toLocaleString()}원</span>
                  <span style={styles.bookViews}>조회 {book.views.toLocaleString()}회</span>
                </div>
              </div>
              <Link to={`/rent/${book.id}`}>
                <button style={styles.rentButton} className="rent-button">
                  대여하기
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowWritingModal(true)}
        style={styles.floatingButton}
        className="floating-button"
        title="원고 작성"
      >
        +
      </button>

      {showWritingModal && (
        <div style={styles.modalOverlay} onClick={() => setShowWritingModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>원고 관리</h3>
            <div style={styles.modalButtons}>
              <button
                onClick={() => {
                  setShowWritingModal(false);
                  navigate('/manuscripts/create');
                }}
                style={styles.modalButton}
                className="modal-button"
              >
                새 원고 작성
              </button>
              <button
                onClick={() => {
                  setShowWritingModal(false);
                  navigate('/manuscripts/edit/1');
                }}
                style={styles.modalButton}
                className="modal-button"
              >
                원고 수정
              </button>
            </div>
            <button
              onClick={() => setShowWritingModal(false)}
              style={styles.closeButton}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: '#ffffff',
    color: '#000000'
  },
  container: {
    padding: '2rem 1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
    color: '#8E24AA'
  },
  pageSubtitle: {
    fontSize: '1.1rem',
    color: '#000000',
    margin: 0
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0.8rem',
    marginBottom: '2rem',
    padding: '1rem',
    background: '#ffffff',
    borderRadius: '12px'
  },
  tab: {
    padding: '0.8rem 1.5rem',
    borderRadius: '25px',
    border: '1px solid #8E24AA',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: '#ffffff',
    color: '#8E24AA'
  },
  activeTab: {
    background: '#8E24AA',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(142, 36, 170, 0.4)'
  },
  inactiveTab: {},
  booksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    paddingBottom: '100px'
  },
  bookRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    padding: '2.2rem',
    background: '#ffffff',
    border: '1px solid #8E24AA',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  rankBadge: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#8E24AA',
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  bookImageContainer: {
    flexShrink: 0,
    borderRadius: '8px',
    overflow: 'hidden'
  },
  bookImage: {
    width: '120px',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    transition: 'transform 0.3s ease'
  },
  bookInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem'
  },
  bookTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#000000'
  },
  bookAuthor: {
    fontSize: '1.5rem',
    color: '#000000',
    margin: 0
  },
  bookMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '0.5rem'
  },
  bookPrice: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#8E24AA'
  },
  bookViews: {
    fontSize: '1.3rem',
    color: '#000000'
  },
  rentButton: {
    padding: '0.8rem 1.5rem',
    background: '#8E24AA',
    color: '#ffffff',
    border: 'none',
    borderRadius: '25px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flexShrink: 0
  },
  floatingButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: '#8E24AA',
    color: '#ffffff',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000
  },
  modalContent: {
    background: '#ffffff',
    color: '#000000',
    padding: '2rem',
    borderRadius: '16px',
    textAlign: 'center',
    minWidth: '350px',
    maxWidth: '450px'
  },
  modalTitle: {
    margin: '0 0 2rem 0',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#8E24AA'
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem'
  },
  modalButton: {
    padding: '1.2rem 1.5rem',
    background: '#8E24AA',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  closeButton: {
    padding: '0.8rem 2rem',
    background: '#ffffff',
    color: '#8E24AA',
    border: '1px solid #8E24AA',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .book-row:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(142, 36, 170, 0.2);
    background: #ffffff;
  }
  .book-image:hover {
    transform: scale(1.05);
  }
  .floating-button:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(142, 36, 170, 0.6);
  }
  .modal-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(142, 36, 170, 0.4);
  }
  .rent-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(142, 36, 170, 0.4);
  }
`;
document.head.appendChild(styleSheet);

export default MainPage;
