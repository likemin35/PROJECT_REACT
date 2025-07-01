import React from 'react';

function TextAreaInput({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        style={{ width: '100%', padding: '0.5rem' }}
      />
    </div>
  );
}

export default TextAreaInput;
