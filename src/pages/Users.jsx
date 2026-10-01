import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getUsers } from '../services/api';
import Loading from '../components/common/Loading';
import { Search, Mail, Shield, UserPlus } from 'lucide-react';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Team & Users Directory</h2>
          <p className="text-xs sm:text-sm text-gray-500">Manage internal teammates and collaborator permissions.</p>
        </div>
        <button
          onClick={() => alert("Invite teammate modal")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-xs font-bold text-white rounded-xl hover:bg-neutral-800 transition-all shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {loading ? (
        <Loading message="Loading team members..." />
      ) : (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
          <div className="relative w-full sm:w-80 mb-6">
            <input
              type="text"
              placeholder="Search user name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3.5 py-2 pl-9 bg-neutral-50 rounded-xl text-xs text-gray-800 border border-transparent focus:border-gray-200 focus:bg-white outline-none transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((user) => (
              <div
                key={user.id}
                className="p-5 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{user.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{user.role}</p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        user.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : user.status === 'Away'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      ● {user.status}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 truncate">
                    <Mail className="w-3.5 h-3.5" />
                    {user.email}
                  </span>
                  <span className="font-semibold text-gray-700">{user.department}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Users;
