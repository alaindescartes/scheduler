import React from 'react';

function OperationBtn({ label, onClick, color = 'blue' }) {
  const baseStyles = `w-full rounded-md shadow-sm px-4 py-2 transition text-white font-semibold`;
  const colorStyles =
    color === 'blue'
      ? 'bg-blue-500 hover:bg-blue-600 text-white'
      : color === 'green'
        ? ' bg-green-500 hover:bg-green-600 text-white'
        : color === 'red'
          ? 'bg-red-500 border border-red-500 hover:bg-red-600 text-white'
          : 'bg-gray-500 hover:bg-gray-600';

  return (
    <button onClick={onClick} className={`${baseStyles} ${colorStyles}`}>
      {label}
    </button>
  );
}

export default OperationBtn;
