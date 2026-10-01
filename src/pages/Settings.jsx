import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { User, Bell, Lock, Palette, Save } from 'lucide-react';

export const Settings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Administrator');
  const [email, setEmail] = useState(user?.email || 'admin@board.dev');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [security2FA, setSecurity2FA] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Application Settings</h2>
        <p className="text-xs sm:text-sm text-gray-500">Manage account preferences, notifications, and security rules.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-100 max-w-3xl">
        {saved && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <span>✓ Settings successfully updated!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-black" />
              <span>Profile Information</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 text-xs text-gray-800 border border-gray-200 outline-none focus:bg-white focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 text-xs text-gray-500 border border-transparent outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4 text-black" />
              <span>Notifications</span>
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-black accent-black focus:ring-0"
              />
              <span className="text-xs text-gray-700">Receive email summaries for weekly activity spikes</span>
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-black" />
              <span>Security</span>
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={security2FA}
                onChange={(e) => setSecurity2FA(e.target.checked)}
                className="w-4 h-4 rounded text-black accent-black focus:ring-0"
              />
              <span className="text-xs text-gray-700">Enforce Two-Factor Authentication (2FA) for next login</span>
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
