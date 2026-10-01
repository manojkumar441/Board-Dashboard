import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getTransactions } from '../services/api';
import Loading from '../components/common/Loading';
import { Search, Download, Filter, CheckCircle2, Clock, XCircle } from 'lucide-react';

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    getTransactions().then((data) => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  const filtered = transactions.filter((t) => {
    const matchesQuery = t.customer.toLowerCase().includes(filterQuery.toLowerCase()) ||
                         t.id.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;
    return matchesQuery && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Transactions</h2>
          <p className="text-xs sm:text-sm text-gray-500">Monitor all client settlements and payment records.</p>
        </div>
        <button
          onClick={() => alert("Exporting transactions to CSV...")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-xs font-bold text-gray-800 rounded-xl border border-gray-200 hover:shadow-sm transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {loading ? (
        <Loading message="Loading transactions ledger..." />
      ) : (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search transaction ID or customer..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full px-3.5 py-2 pl-9 bg-neutral-50 rounded-xl text-xs text-gray-800 border border-transparent focus:border-gray-200 focus:bg-white outline-none transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gray-400" />
              {['All', 'Completed', 'Pending', 'Failed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedStatus === status
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 text-gray-600 hover:bg-neutral-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs text-gray-800">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-gray-900">{item.id}</td>
                    <td className="py-3.5 px-4 font-semibold">{item.customer}</td>
                    <td className="py-3.5 px-4 text-gray-500">{item.date}</td>
                    <td className="py-3.5 px-4 text-gray-600">{item.method}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">{item.amount}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          item.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : item.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {item.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                        {item.status === 'Pending' && <Clock className="w-3 h-3" />}
                        {item.status === 'Failed' && <XCircle className="w-3 h-3" />}
                        <span>{item.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Transactions;
