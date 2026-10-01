import React, { useState } from 'react';
import { ChevronRight, Plus, X, Calendar, MapPin, Clock } from 'lucide-react';

export const ScheduleCard = ({ schedules: initialSchedules = [] }) => {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTime.trim()) return;

    const colors = ["#9BDD7C", "#6972C4", "#F6DC7D", "#EE8484"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newItem = {
      id: Date.now(),
      title: newTitle.trim(),
      time: newTime.trim(),
      location: newLocation.trim() || "Virtual Conference Room",
      borderColor: randomColor
    };

    setSchedules([newItem, ...schedules]);
    setNewTitle('');
    setNewTime('');
    setNewLocation('');
    setIsAdding(false);
  };

  return (
    <>
      <div className="bg-white rounded-[20px] p-6 sm:p-7 shadow-sm border border-neutral-100/60 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-[#111111]">Today's schedule</h3>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-700 transition-colors font-medium"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Schedule Items List */}
        <div className="space-y-4">
          {schedules.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="pl-4 py-1 border-l-4 transition-transform duration-150 hover:translate-x-1"
              style={{ borderColor: item.borderColor }}
            >
              <h4 className="text-sm font-bold text-[#333333] leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-neutral-400 font-medium mt-0.5">
                {item.time}
              </p>
              <p className="text-xs text-neutral-400 font-medium">
                {item.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Full Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-black" />
                <h3 className="text-xl font-bold text-gray-900">Complete Schedule</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {schedules.map((item) => (
                <div
                  key={item.id}
                  className="pl-4 py-2 border-l-4 rounded-r-xl bg-neutral-50/60 p-3"
                  style={{ borderColor: item.borderColor }}
                >
                  <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Schedule Form */}
            {isAdding ? (
              <form onSubmit={handleAddSchedule} className="pt-4 border-t border-gray-100 space-y-3">
                <input
                  type="text"
                  placeholder="Meeting / Event Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-black outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Time (e.g. 15:00-16:00)"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-black outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-3 py-1.5 text-xs text-gray-500 hover:text-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-white bg-black rounded-xl hover:bg-neutral-800"
                  >
                    Save Event
                  </button>
                </div>
              </form>
            ) : (
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => setIsAdding(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:border-black hover:bg-gray-50 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Schedule Event</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleCard;
