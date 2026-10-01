import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../services/api';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatsGrid from '../components/dashboard/StatsGrid';
import ActivitiesChart from '../components/dashboard/ActivitiesChart';
import ProductsChart from '../components/dashboard/ProductsChart';
import ScheduleCard from '../components/dashboard/ScheduleCard';
import AvatarGroup from '../components/dashboard/AvatarGroup';
import Loading from '../components/common/Loading';
import { RefreshCw, AlertCircle } from 'lucide-react';

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      setError(err.message || "Failed to load dashboard data from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      {loading && <Loading message="Loading dashboard statistics & analytics..." />}

      {error && !loading && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 sm:p-8 text-center my-8 max-w-lg mx-auto shadow-sm">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-rose-900 mb-1">
            Data Fetching Error
          </h3>
          <p className="text-xs sm:text-sm text-rose-700 mb-5">{error}</p>
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {!loading && !error && dashboardData && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-neutral-400 font-medium">
              Overview • Real-time Metrics
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-medium hidden sm:inline">
                Active Team:
              </span>
              <AvatarGroup avatars={dashboardData.avatars || []} max={4} />
            </div>
          </div>

          <StatsGrid stats={dashboardData.stats} />

          <ActivitiesChart data={dashboardData.activities} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductsChart products={dashboardData.products} />
            <ScheduleCard schedules={dashboardData.schedules} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
