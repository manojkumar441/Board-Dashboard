import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ScheduleCard from '../components/dashboard/ScheduleCard';
import { schedulesData } from '../data/dashboardData';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const Schedules = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Schedules & Appointments</h2>
        <p className="text-xs sm:text-sm text-gray-500">Manage client calls, operations reviews, and meetings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Upcoming Timeline</span>
            </h3>
            <div className="space-y-4">
              {schedulesData.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-neutral-50 border-l-4 hover:shadow-sm transition-all"
                  style={{ borderColor: item.borderColor }}
                >
                  <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {item.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {item.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ScheduleCard schedules={schedulesData} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Schedules;
