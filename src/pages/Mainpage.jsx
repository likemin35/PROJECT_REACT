import React from 'react';

const dummyBooks = [
  { title: '해리포터', author: '조하민' },
  { title: '미움받을용기', author: '이원준' },
  { title: '하하엄마처럼 하하하', author: '장원진' },
  { title: '정준하장가가기40일대작전', author: '김영진' },
  { title: '이기적유전자', author: '조은형' },
  { title: '20대 투자에 미쳐라', author: '정병찬' },
  { title: '개미', author: '이승환' },
  { title: '드리블러', author: '김진희' },
  { title: '보리곰곰과 일곱 난쟁이', author: '곽보라' },
  { title: '수박은 장마철 이전이 맛있다', author: '윤성열' },
  { title: '명탐정코난', author: '한기영' },
  { title: '인생은 롤러코스터처럼', author: '최하림' },
];

function MainPage() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* ✅ 네비게이션 바 */}
      <nav style={{
        backgroundColor: '#fff2e5',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ color: '#ff5722', fontWeight: 'bold', fontSize: '1.5rem' }}>
          KT 걷다가서재
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={navBtnStyle}>마이페이지</button>
          <button style={navBtnStyle}>포인트 충전</button>
        </div>
      </nav>

      {/* ✅ 도서 검색 입력 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem 2rem' }}>
        <input type="text" placeholder="도서검색" style={{ padding: '0.5rem', fontSize: '0.9rem' }} />
      </div>

      {/* ✅ 도서 목록 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // 고정 4열
        gap: '1.5rem',
        padding: '2rem',
        justifyItems: 'center'
      }}>
        {dummyBooks.map((book, idx) => (
          <div key={idx} style={{
            backgroundColor: '#b0f8a8',
            width: '200px',
            height: '300px',
            borderRadius: '8px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '0',
              padding: '0.7rem',
              backgroundColor: '#fff',
              width: '100%',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
              fontSize: '0.85rem'
            }}>
              <div style={{ fontWeight: 'bold' }}>{book.title}</div>
              <div style={{ color: 'gray' }}>{book.author}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ 하단 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '1rem 2rem' }}>
        <button style={footerBtnStyle}>원고 수정</button>
        <button style={footerBtnStyle}>원고 등록</button>
      </div>
    </div>
  );
}

// 공통 버튼 스타일
const navBtnStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#ffab91',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
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