'use client';

import BottomNav from '@/components/BottomNav';
import { Users } from 'lucide-react';

export default function FriendsPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-4 py-3 bg-white shadow-sm z-10 shrink-0">
        <h1 className="font-semibold text-lg text-gray-800">友だち</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
        <Users size={64} strokeWidth={1} />
        <p className="text-sm">友だち機能は準備中です</p>
      </div>

      <BottomNav active="friends" />
    </div>
  );
}
