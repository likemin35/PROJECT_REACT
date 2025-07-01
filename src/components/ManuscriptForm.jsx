import React from 'react';

const ManuscriptForm = ({ manuscript, setManuscript, onSave, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setManuscript({ ...manuscript, [name]: value });
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 상단 KT 걷다가서재 바 - 페이지 맨 위에 위치 */}
      <div style={{
        backgroundColor: '#FFF3E0',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ color: '#FF6D4D', fontWeight: 'bold', fontSize: '20px' }}>
          KT 걷다가서재
        </div>
        <div style={{ color: '#FF6D4D', fontSize: '14px' }}>
          마이페이지
        </div>
      </div>

      {/*  원고 폼 */}
      <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>제목</label>
            <input
              type="text"
              name="title"
              value={manuscript.title}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#E0E0E0',
                border: 'none'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>작가</label>
            <input
              type="text"
              name="authorId"
              value={manuscript.authorId}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#E0E0E0',
                border: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <textarea
            name="content"
            value={manuscript.content}
            onChange={handleChange}
            placeholder="원고를 입력하세요"
            style={{
              width: '100%',
              height: '400px',
              padding: '10px',
              resize: 'none',
              backgroundColor: '#FFFFFF',
              border: '1px solid #000'
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={onSave}
            style={{
              backgroundColor: '#FF6D4D',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            임시 저장
          </button>
          <button
            onClick={onSubmit}
            style={{
              backgroundColor: '#FF6D4D',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            출판 신청
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManuscriptForm;
