import React from 'react';

function PortfolioList({ portfolios, setPortfolios }) {
  const handleChange = (index, field, value) => {
    const updated = [...portfolios];
    updated[index][field] = value;
    setPortfolios(updated);
  };

  const handleAdd = () => {
    setPortfolios([...portfolios, { category: '', title: '' }]);
  };

  const handleRemove = (index) => {
    const updated = [...portfolios];
    updated.splice(index, 1);
    setPortfolios(updated);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>포트폴리오 리스트</h4>
      {portfolios.map((item, index) => (
        <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="카테고리"
            value={item.category}
            onChange={(e) => handleChange(index, 'category', e.target.value)}
            style={{ flex: 1 }}
          />
          <input
            type="text"
            placeholder="작품 제목"
            value={item.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
            style={{ flex: 2 }}
          />
          <button onClick={() => handleRemove(index)}>삭제</button>
        </div>
      ))}
      <button onClick={handleAdd}>+ 포트폴리오 추가</button>
    </div>
  );
}

export default PortfolioList;
