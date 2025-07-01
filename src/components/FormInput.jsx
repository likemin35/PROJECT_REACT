import React from 'react';

function FormInput({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontWeight: 'bold' }}>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        style={{ width: '100%', padding: '0.5rem' }}
      />
    </div>
  );
}

export default FormInput;
