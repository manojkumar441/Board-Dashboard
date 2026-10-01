import React from 'react';
import { Banknote, Tags, ThumbsUp, Users, HelpCircle } from 'lucide-react';

const iconMap = {
  Banknote: Banknote,
  Tags: Tags,
  ThumbsUp: ThumbsUp,
  Users: Users,
};

export const DashboardCard = ({
  title,
  value,
  icon,
  bgClass = "bg-[#DDEFE0]",
  badge,
  badgeColor = "text-emerald-700 bg-emerald-100"
}) => {
  const IconComponent = iconMap[icon] || HelpCircle;

  return (
    <div
      className={`${bgClass} rounded-[20px] p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between min-h-[120px]`}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs sm:text-sm font-medium text-neutral-800 tracking-normal">
          {title}
        </p>
        <div className="p-1 text-black">
          <IconComponent className="w-5 h-5 stroke-[1.8]" />
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-3">
        <h3 className="text-2xl font-extrabold text-black font-display tracking-tight">
          {value}
        </h3>
        {badge && (
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
