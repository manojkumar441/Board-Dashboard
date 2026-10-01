import React from 'react';
import DashboardCard from './DashboardCard';

export const StatsGrid = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8">
      {stats.map((item) => (
        <DashboardCard
          key={item.id || item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          bgClass={item.bgClass}
          badge={item.badge}
          badgeColor={item.badgeColor}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
