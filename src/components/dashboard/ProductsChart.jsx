import React, { useState, useRef, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ChevronDown, Check } from 'lucide-react';
import { productsByPeriod } from '../../data/dashboardData';

export const ProductsChart = ({ initialPeriod = "May - June 2021" }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const periods = Object.keys(productsByPeriod);
  const products = productsByPeriod[selectedPeriod] || productsByPeriod["May - June 2021"];

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
    <div className="bg-white rounded-[20px] p-6 sm:p-7 shadow-sm border border-neutral-100/60 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#111111]">Top products</h3>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 transition-colors focus:outline-none"
          >
            <span>{selectedPeriod}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20 animate-in fade-in zoom-in-95">
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

      {/* Donut Chart + Legend */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
        <div className="w-44 h-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(val, name) => [`${val}%`, name]}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px'
                }}
              />
              <Pie
                data={products}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
              >
                {products.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4 w-full sm:w-auto">
          {products.map((product) => (
            <div key={product.name} className="flex items-start gap-3">
              <span
                className="w-3 h-3 rounded-full mt-1 shrink-0"
                style={{ backgroundColor: product.color }}
              />
              <div>
                <p className="text-sm font-bold text-[#111111] leading-tight">
                  {product.name}
                </p>
                <p className="text-xs text-neutral-400 font-medium">
                  {product.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsChart;
