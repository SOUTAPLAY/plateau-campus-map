'use client';

import BottomNav from '@/components/BottomNav';
import MapView from '@/components/MapView';

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">明</span>
          </div>
          <div>
            <p className="text-xs text-gray-500">明星大学</p>
            <p className="font-semibold text-sm text-gray-800">キャンパスマップ</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
          <span>3D</span>
          <span className="text-blue-500 font-semibold">PLATEAU</span>
        </div>
      </header>

      {/* Map */}
      <div className="flex-1 relative overflow-hidden">
        <MapView />
      </div>

      <BottomNav active="home" />
    </div>
  );
}
