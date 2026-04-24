'use client';

import BottomNav from '@/components/BottomNav';
import { Search } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-4 py-3 bg-white shadow-sm z-10 shrink-0">
        <h1 className="font-semibold text-lg text-gray-800">検索</h1>
      </header>

      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="建物・教室・授業を検索..."
            className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
        <Search size={64} strokeWidth={1} />
        <p className="text-sm">キーワードを入力して検索</p>
      </div>

      <BottomNav active="search" />
    </div>
  );
}
