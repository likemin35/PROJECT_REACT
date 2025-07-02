import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import TextAreaInput from '../components/TextAreaInput';
import PortfolioList from '../components/PortfolioList';

function AuthorRegisterPage() {
  const [form, setForm] = useState({
    email: '',
    name: '',
    bio: '',
    mainWork: '',
    portfolios: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('제출된 작가 정보:', form);
    // 나중에 axios.post('/api/authors', form) 식으로 연동 가능
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', color: '#000000', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={{ color: '#8E24AA', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2rem' }}>작가 등록</h2>

          <div style={{ marginBottom: '1.5rem' }}>
            <FormInput
              label="이메일"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <FormInput
              label="작가 이름"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <TextAreaInput
              label="작가 소개"
              name="bio"
              value={form.bio}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <FormInput
              label="대표작"
              name="mainWork"
              value={form.mainWork}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <PortfolioList
              portfolios={form.portfolios}
              setPortfolios={(portfolios) => setForm({ ...form, portfolios })}
            />
          </div>

          <button
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#8E24AA',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(142, 36, 170, 0.2)'
            }}
            onClick={handleSubmit}
          >
            등록 신청하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthorRegisterPage;
