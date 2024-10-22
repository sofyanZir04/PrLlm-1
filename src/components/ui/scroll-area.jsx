import React from 'react';

export function ScrollArea({ children }) {
  return (
    <div className="overflow-y-auto h-64">
      {children}
    </div>
  );
}
