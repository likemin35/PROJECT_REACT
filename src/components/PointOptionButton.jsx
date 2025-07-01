import React from 'react';

function PointOptionButton({ options, selected, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {options.map(({ point, price }) => (
        <button
          key={point}
          onClick={() => onSelect({ point, price })}
          style={{
            padding: '1rem',
            border: selected?.point === point ? '2px solid blue' : '1px solid gray',
            background: selected?.point === point ? '#e0f0ff' : '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            minWidth: '140px',
          }}
        >
          {point.toLocaleString()}P<br />
          {price.toLocaleString()}원
        </button>
      ))}
    </div>
  );
}

export default PointOptionButton;
