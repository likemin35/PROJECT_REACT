import React from 'react';
import { Link } from 'react-router-dom';

const dummyBooks = [
  { id: 1, title: '해리포터', author: '조하민' },
  { id: 2, title: '미움받을용기', author: '이원준' },
  { id: 3, title: '하하엄마처럼 하하하', author: '장우진' },
  { id: 4, title: '정준하장가가기40일대작전', author: '김영진' },
  { id: 5, title: '이기적유전자', author: '조은형' },
  { id: 6, title: '20대 투자에 미쳐라', author: '정병찬' },
  { id: 7, title: '개미', author: '이승환' },
  { id: 8, title: '드리블러', author: '김진희' },
  { id: 9, title: '보리곰곰과 일곱 난쟁이', author: '곽보라' },
  { id: 10, title: '수박은 장마철 이전이 맛있다', author: '윤성열' },
  { id: 11, title: '명탐정코난', author: '한기영' },
  { id: 12, title: '인생은 롤러코스터처럼', author: '최하림' },
];

function MainPage() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 네비게이션 바 */}
      <nav style={navStyle}>
        <div style={logoStyle}>KT 걷다가서재</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/mypage">
            <button style={navBtnStyle}>마이페이지</button>
          </Link>
          <Link to="/charge">
            <button style={navBtnStyle}>포인트 충전</button>
          </Link>
        </div>
      </nav>

      {/* 도서 검색 입력 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem 2rem' }}>
        <input
          type="text"
          placeholder="도서검색"
          style={{ padding: '0.5rem', fontSize: '0.9rem' }}
        />
      </div>

      {/* 도서 목록 */}
      <div style={gridStyle}>
        {dummyBooks.map((book) => (
          <Link key={book.id} to={`/rent/${book.id}`} style={{ textDecoration: 'none' }}>
            <div style={bookCardStyle}>
              <div style={bookInfoStyle}>
                <div style={{ fontWeight: 'bold', color: 'black' }}>{book.title}</div>
                <div style={{ color: 'gray' }}>{book.author}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '1rem 2rem' }}>
        <Link to="/manuscripts/edit/1">
          <button style={footerBtnStyle}>원고 수정</button>
        </Link>
        <Link to="/manuscripts/create">
          <button style={footerBtnStyle}>원고 등록</button>
        </Link>
      </div>
    </div>
    
  );
}

// 스타일 정의
const navStyle = {
  backgroundColor: '#fff2e5',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const logoStyle = {
  color: '#ff5722',
  fontWeight: 'bold',
  fontSize: '1.5rem'
};

const navBtnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#ffab91',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1.5rem',
  padding: '2rem',
  justifyItems: 'center'
};

const bookCardStyle = {
  backgroundColor: '#b0f8a8',
  width: '200px',
  height: '300px',
  borderRadius: '8px',
  position: 'relative',
  cursor: 'pointer'
};

const bookInfoStyle = {
  position: 'absolute',
  bottom: '0',
  padding: '0.7rem',
  backgroundColor: '#fff',
  width: '100%',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  fontSize: '0.85rem'
};

const footerBtnStyle = {
  padding: '0.6rem 1.2rem',
  backgroundColor: '#ff7043',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default MainPage;
