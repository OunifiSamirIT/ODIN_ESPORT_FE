import React from 'react';

function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-red-600">Unauthorized - Admins Only</h1>
    </div>
  );
}

export default Unauthorized;
