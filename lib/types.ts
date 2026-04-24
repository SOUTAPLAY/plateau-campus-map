export type DayOfWeek = '月' | '火' | '水' | '木' | '金' | '土';

export const DAYS: DayOfWeek[] = ['月', '火', '水', '木', '金', '土'];
export const PERIODS = [1, 2, 3, 4, 5, 6] as const;
export type Period = (typeof PERIODS)[number];

export interface Course {
  id: string;
  name: string;
  instructor: string;
  room: string;
  day: DayOfWeek;
  period: Period;
  color: string;
}

export const COURSE_COLORS = [
  '#60A5FA', // blue-400
  '#34D399', // emerald-400
  '#F87171', // red-400
  '#FBBF24', // amber-400
  '#A78BFA', // violet-400
  '#F472B6', // pink-400
  '#2DD4BF', // teal-400
  '#FB923C', // orange-400
];
