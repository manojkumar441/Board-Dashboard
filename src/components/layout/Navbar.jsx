import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onOpenMobileMenu }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between py-6 px-4 sm:px-8 bg-transparent">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-black hover:bg-white/80 transition-colors shadow-sm"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
          Dashboard
        </h2>
      </div>

      {/* Right: Search, Notifications, Avatar */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-36 sm:w-52 md:w-60 bg-white text-sm text-[#333333] pl-4 pr-10 py-2 rounded-full shadow-sm border border-transparent focus:border-gray-200 focus:outline-none transition-all duration-200 placeholder:text-gray-400"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => {
            setHasUnreadNotification(false);
            alert("No new notifications at this time.");
          }}
          className="relative p-2 rounded-full text-black hover:bg-white/80 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-[#111111]" />
          {hasUnreadNotification && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
          )}
        </button>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 focus:outline-none rounded-full ring-2 ring-white shadow-sm hover:ring-gray-300 transition-all"
            aria-label="User profile menu"
          >
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user.name || "User Avatar"}
                className="w-9 h-9 rounded-full object-cover border border-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80";
                }}
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </button>

          {/* Profile Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user?.name || "Authenticated User"}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {user?.email || "user@example.com"}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Authenticated via {user?.provider || 'Google'}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-medium text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
