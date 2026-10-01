import React from 'react';

export const Loading = ({ message = "Loading dashboard data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8">
      <div className="relative w-14 h-14 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-500 font-medium text-sm animate-pulse">{message}</p>
    </div>
  );
};

export default Loading;
