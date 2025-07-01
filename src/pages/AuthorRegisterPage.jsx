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
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>작가 등록</h2>

      <FormInput
        label="이메일"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <FormInput
        label="작가 이름"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <TextAreaInput
        label="작가 소개"
        name="bio"
        value={form.bio}
        onChange={handleChange}
      />

      <FormInput
        label="대표작"
        name="mainWork"
        value={form.mainWork}
        onChange={handleChange}
      />

      <PortfolioList
        portfolios={form.portfolios}
        setPortfolios={(portfolios) => setForm({ ...form, portfolios })}
      />

      <button
        style={{ marginTop: '1rem' }}
        onClick={handleSubmit}
      >
        등록신청
      </button>
    </div>
  );
}

export default AuthorRegisterPage;
