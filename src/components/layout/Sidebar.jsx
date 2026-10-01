import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Tags,
  CalendarDays,
  CircleUserRound,
  Settings,
  X
} from 'lucide-react';

export const Sidebar = ({ isMobileOpen, onClose }) => {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Transactions', icon: Tags, path: '/dashboard/transactions' },
    { label: 'Schedules', icon: CalendarDays, path: '/dashboard/schedules' },
    { label: 'Users', icon: CircleUserRound, path: '/dashboard/users' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const content = (
    <div className="flex flex-col justify-between h-full text-white bg-black p-8 rounded-[30px] shadow-2xl">
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight font-display">
            Board.
          </h1>
          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 text-lg transition-all duration-200 group ${
                    isActive
                      ? 'font-bold text-white'
                      : 'text-neutral-400 hover:text-white font-normal'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                      }`}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Links */}
      <div className="space-y-4 pt-8 text-sm text-neutral-400">
        <a
          href="#help"
          className="block hover:text-white transition-colors duration-150"
          onClick={(e) => {
            e.preventDefault();
            alert("Help & Documentation: Listed Board Assignment Reference Dashboard");
          }}
        >
          Help
        </a>
        <a
          href="#contact"
          className="block hover:text-white transition-colors duration-150"
          onClick={(e) => {
            e.preventDefault();
            alert("Contact Us: support@board-dashboard.example");
          }}
        >
          Contact Us
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 p-6 sticky top-0 h-screen">
        {content}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[80vw] p-4 z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
