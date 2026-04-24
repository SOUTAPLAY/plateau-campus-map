'use client';

import BottomNav from '@/components/BottomNav';
import TimetableView from '@/components/TimetableView';

export default function CoursesPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-4 py-3 bg-white shadow-sm z-10 shrink-0">
        <h1 className="font-semibold text-lg text-gray-800">履修時間割</h1>
      </header>
      <div className="flex-1 overflow-auto">
        <TimetableView />
      </div>
      <BottomNav active="courses" />
    </div>
  );
}
