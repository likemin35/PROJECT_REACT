import React, { useState } from 'react';

function SignupPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    isKT: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log('회원가입 정보:', form);
    alert('회원가입 완료!');
    // TODO: axios.post('/api/signup', form)
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>회원가입</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>아이디</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>전화번호</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
          <label>
            <input
              type="checkbox"
              name="isKT"
              checked={form.isKT}
              onChange={handleChange}
            />
            KT 사용자
          </label>
        </div>
      </div>

      <button onClick={handleSubmit}>회원가입</button>
    </div>
  );
}

export default SignupPage;
