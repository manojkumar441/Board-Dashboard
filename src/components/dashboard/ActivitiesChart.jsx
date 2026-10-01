import React, { useState, useRef, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { ChevronDown, Check } from 'lucide-react';
import { activitiesByPeriod } from '../../data/dashboardData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-xs">
        <p className="font-bold text-gray-700 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 py-0.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-500 capitalize">{entry.name}:</span>
            <span className="font-bold text-gray-900">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const ActivitiesChart = ({ initialPeriod = "May - June 2021" }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const periods = Object.keys(activitiesByPeriod);
  const chartData = activitiesByPeriod[selectedPeriod] || activitiesByPeriod["May - June 2021"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-[20px] p-6 sm:p-7 shadow-sm border border-neutral-100/60 mb-8 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#111111]">Activities</h3>
          {/* Period selector dropdown */}
          <div className="relative inline-block mt-0.5" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 transition-colors focus:outline-none"
            >
              <span>{selectedPeriod}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20 animate-in fade-in zoom-in-95">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedPeriod(p);
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-neutral-50 font-medium text-neutral-700"
                  >
                    <span>{p}</span>
                    {p === selectedPeriod && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EE8484]" />
            <span className="text-neutral-700">Guest</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#98D89E]" />
            <span className="text-neutral-700">User</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ECECEC"
            />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#858585', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#858585', fontSize: 12, fontWeight: 500 }}
              ticks={[0, 100, 200, 300, 400, 500]}
              domain={[0, 500]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              name="Guest"
              dataKey="guest"
              stroke="#EE8484"
              strokeWidth={3}
              dot={{ r: 4, fill: '#EE8484', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#EE8484', stroke: '#fff', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              name="User"
              dataKey="user"
              stroke="#98D89E"
              strokeWidth={3}
              dot={{ r: 4, fill: '#98D89E', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#98D89E', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivitiesChart;
