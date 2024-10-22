import React from 'react';

export function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      className="px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  );
}
