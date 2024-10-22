import React from 'react';

export function Input({ ...props }) {
  return (
    <input
      {...props}
      className="px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  );
}
