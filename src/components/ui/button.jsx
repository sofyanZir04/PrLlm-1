import React from 'react';

export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
    >
      {children}
    </button>
  );
}
