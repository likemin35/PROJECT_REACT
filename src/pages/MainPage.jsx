import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const allBooks = [
  { id: 1, title: '해리포터', author: '조하민', price: 12000, views: 15420, image: '/assets/sample1.png' },
  { id: 2, title: '미움받을용기', author: '이원준', price: 9800, views: 8830, image: '/assets/sample2.png' },
  { id: 3, title: '하하엄마처럼 하하하', author: '장우진', price: 10500, views: 12650, image: '/assets/sample3.png' },
  { id: 4, title: '정준하장가가기40일대작전', author: '김영진', price: 8800, views: 6420, image: '/assets/sample4.png' },
  { id: 5, title: '이기적유전자', author: '조은형', price: 11200, views: 21100, image: '/assets/sample5.png' },
  { id: 6, title: '20대 투자에 미쳐라', author: '정병찬', price: 9900, views: 18750, image: '/assets/sample6.png' },
  { id: 7, title: '개미', author: '이승환', price: 10800, views: 9340, image: '/assets/sample7.png' },
  { id: 8, title: '드리블러', author: '김진희', price: 8700, views: 5670, image: '/assets/sample8.png' },
  { id: 9, title: '보리곰곰과 일곱 난쟁이', author: '곽보라', price: 9700, views: 13240, image: '/assets/sample9.png' },
  { id: 10, title: '수박은 장마철 이전이 맛있다', author: '윤성열', price: 9900, views: 7890, image: '/assets/sample10.png' },
  { id: 11, title: '명탐정코난', author: '한기영', price: 11500, views: 24680, image: '/assets/sample11.png' },
  { id: 12, title: '인생은 롤러코스터처럼', author: '최하림', price: 8900, views: 11430, image: '/assets/sample12.png' }
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
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>📚 도서 탐색</h1>
          <p style={styles.pageSubtitle}>당신의 다음 모험을 찾아보세요</p>
        </div>

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
                  <span style={styles.bookViews}>👁️ {book.views.toLocaleString()}회</span>
                </div>
              </div>
              <Link to={`/rent/${book.id}`}>
                <button style={styles.rentButton} className="rent-button">
                  <span style={styles.buttonIcon}>📖</span>
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
        ✏️
      </button>

      {showWritingModal && (
        <div style={styles.modalOverlay} onClick={() => setShowWritingModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>📝 원고 관리</h3>
            <div style={styles.modalButtons}>
              <button
                onClick={() => {
                  setShowWritingModal(false);
                  navigate('/manuscripts/create');
                }}
                style={styles.modalButton}
                className="modal-button"
              >
                <span style={styles.buttonIcon}>📝</span>
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
                <span style={styles.buttonIcon}>🔧</span>
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
    background: 'white',
    color: '#1a1a2e'
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
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  pageSubtitle: {
    fontSize: '1.1rem',
    color: '#666',
    margin: 0
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0.8rem',
    marginBottom: '2rem',
    padding: '1rem',
    background: '#f7f7f7',
    borderRadius: '20px'
  },
  tab: {
    padding: '0.8rem 1.5rem',
    borderRadius: '25px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease'
  },
  activeTab: {
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    color: '#1a1a2e',
    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
  },
  inactiveTab: {
    background: '#eee',
    color: '#555',
    border: '1px solid #ccc'
  },
  booksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingBottom: '100px'
  },
  bookRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1.5rem',
    background: '#fdfdfd',
    border: '1px solid #ddd',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  rankBadge: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  bookImageContainer: {
    flexShrink: 0,
    borderRadius: '12px',
    overflow: 'hidden'
  },
  bookImage: {
    width: '80px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
    transition: 'transform 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  bookInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  bookTitle: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#1a1a2e'
  },
  bookAuthor: {
    fontSize: '1.1rem',
    color: '#666',
    margin: 0
  },
  bookMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '0.5rem'
  },
  bookPrice: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  bookViews: {
    fontSize: '1rem',
    color: '#888'
  },
  rentButton: {
    padding: '0.8rem 1.5rem',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    color: '#1a1a2e',
    border: 'none',
    borderRadius: '25px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexShrink: 0
  },
  floatingButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(142, 36, 170, 0.4)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000
  },
  modalContent: {
    background: 'white',
    color: '#1a1a2e',
    padding: '2rem',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    minWidth: '350px',
    maxWidth: '450px'
  },
  modalTitle: {
    margin: '0 0 2rem 0',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem'
  },
  modalButton: {
    padding: '1.2rem 1.5rem',
    background: 'linear-gradient(135deg, #8E24AA 0%, #7B1FA2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem'
  },
  closeButton: {
    padding: '0.8rem 2rem',
    background: '#eee',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '12px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  buttonIcon: {
    fontSize: '1.2rem'
  }
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .book-row:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    background: #f2f2f2;
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
    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
  }
`;
document.head.appendChild(styleSheet);

export default MainPage;
