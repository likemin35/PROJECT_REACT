import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const allBooks = [
  { id: 1, title: '해리포터', author: '조하민', price: 12000, rating: 9.2, image: '/assets/sample1.png' },
  { id: 2, title: '미움받을용기', author: '이원준', price: 9800, rating: 8.8, image: '/assets/sample2.png' },
  { id: 3, title: '하하엄마처럼 하하하', author: '장우진', price: 10500, rating: 9.0, image: '/assets/sample3.png' },
  { id: 4, title: '정준하장가가기40일대작전', author: '김영진', price: 8800, rating: 8.5, image: '/assets/sample4.png' },
  { id: 5, title: '이기적유전자', author: '조은형', price: 11200, rating: 9.1, image: '/assets/sample5.png' },
  { id: 6, title: '20대 투자에 미쳐라', author: '정병찬', price: 9900, rating: 8.9, image: '/assets/sample6.png' },
  { id: 7, title: '개미', author: '이승환', price: 10800, rating: 9.0, image: '/assets/sample7.png' },
  { id: 8, title: '드리블러', author: '김진희', price: 8700, rating: 8.4, image: '/assets/sample8.png' },
  { id: 9, title: '보리곰곰과 일곱 난쟁이', author: '곽보라', price: 9700, rating: 9.3, image: '/assets/sample9.png' },
  { id: 10, title: '수박은 장마철 이전이 맛있다', author: '윤성열', price: 9900, rating: 8.6, image: '/assets/sample10.png' },
  { id: 11, title: '명탐정코난', author: '한기영', price: 11500, rating: 9.5, image: '/assets/sample11.png' },
  { id: 12, title: '인생은 롤러코스터처럼', author: '최하림', price: 8900, rating: 8.7, image: '/assets/sample12.png' }
];

// 모든 카테고리에 동일한 도서 리스트 할당
const bookData = {
  로맨스: allBooks,
  스릴러: allBooks,
  SF: allBooks,
  에세이: allBooks,
  자기계발: allBooks,
};

function MainPage() {
  const categories = Object.keys(bookData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <>
      {/* ✅ 네비게이션 바 */}
      <Navbar />

      {/* ✅ 도서 컨테이너 */}
      <div style={styles.container}>
        {/* 카테고리 탭 */}
        <div style={styles.tabContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.tab,
                backgroundColor: activeCategory === cat ? '#2a62ff' : '#f0f0f0',
                color: activeCategory === cat ? '#fff' : '#333'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 도서 리스트 */}
        {bookData[activeCategory].map((book, index) => (
          <div key={`${book.id}-${index}`} style={styles.row}>
            <div style={styles.rank}>{index + 1}</div>
            <img src={book.image} alt={book.title} style={styles.image} />
            <div style={styles.info}>
              <div style={styles.title}>{book.title}</div>
              <div style={styles.meta}>{book.author}</div>
              <div style={styles.price}>{book.price.toLocaleString()}원</div>
              <div style={styles.rating}>⭐ {book.rating}</div>
            </div>
            <Link to={`/rent/${book.id}`}>
              <button style={styles.rentBtn}>대여하기</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: '1.5rem',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'sans-serif'
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  tab: {
    padding: '0.5rem 1.2rem',
    borderRadius: '20px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.95rem'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 0',
    borderBottom: '1px solid #ddd'
  },
  rank: {
    width: '20px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#333'
  },
  image: {
    width: '80px',
    height: '110px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  info: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginBottom: '0.3rem'
  },
  meta: {
    fontSize: '0.9rem',
    color: '#555'
  },
  price: {
    fontWeight: 'bold',
    color: '#d32f2f',
    fontSize: '0.95rem',
    marginTop: '0.2rem'
  },
  rating: {
    fontSize: '0.85rem',
    marginTop: '0.2rem',
    color: '#333'
  },
  rentBtn: {
    padding: '0.4rem 0.9rem',
    backgroundColor: '#2a62ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default MainPage;
