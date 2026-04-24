'use client';

import Link from 'next/link';
import { Map, BookOpen, Users, Search } from 'lucide-react';
import clsx from 'clsx';

type Tab = 'home' | 'courses' | 'friends' | 'search';

interface BottomNavProps {
  active: Tab;
}

const tabs: { id: Tab; label: string; icon: React.ElementType; href: string }[] = [
  { id: 'home', label: 'ホーム', icon: Map, href: '/' },
  { id: 'courses', label: '履修', icon: BookOpen, href: '/courses' },
  { id: 'friends', label: '友だち', icon: Users, href: '/friends' },
  { id: 'search', label: '検索', icon: Search, href: '/search' },
];

export default function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="bottom-nav shrink-0 flex items-stretch bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
      {tabs.map(({ id, label, icon: Icon, href }) => {
        const isActive = active === id;
        return (
          <Link
            key={id}
            href={href}
            className={clsx(
              'flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors',
              isActive ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
            )}
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 1.75}
              className={clsx(isActive && 'drop-shadow-sm')}
            />
            <span className={clsx('text-[10px] font-medium', isActive && 'font-semibold')}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
