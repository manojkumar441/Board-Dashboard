import React from 'react';

export const AvatarGroup = ({ avatars = [], max = 4 }) => {
  const displayed = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex items-center -space-x-2 overflow-hidden py-1">
      {displayed.map((item, index) => (
        <div key={item.id || index} className="relative group">
          <img
            src={item.avatar}
            alt={item.name}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-sm transition-transform duration-150 group-hover:scale-110 group-hover:z-10"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-30 px-2 py-1 bg-black text-white text-[10px] font-medium rounded shadow-lg whitespace-nowrap">
            {item.name}
          </div>
        </div>
      ))}
      {remaining > 0 && (
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 ring-2 ring-white text-[11px] font-bold text-neutral-700 shadow-sm">
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
