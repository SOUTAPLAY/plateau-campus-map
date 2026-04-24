'use client';

import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Course, DAYS, PERIODS, DayOfWeek, Period, COURSE_COLORS } from '@/lib/types';
import clsx from 'clsx';

interface CourseModalProps {
  day?: DayOfWeek;
  period?: Period;
  course?: Course;
  onSave: (course: Course) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

function generateId() {
  return crypto.randomUUID();
}

export default function CourseModal({
  day,
  period,
  course,
  onSave,
  onDelete,
  onClose,
}: CourseModalProps) {
  const isEdit = !!course;

  const [name, setName] = useState(course?.name ?? '');
  const [instructor, setInstructor] = useState(course?.instructor ?? '');
  const [room, setRoom] = useState(course?.room ?? '');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(course?.day ?? day ?? '月');
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(
    course?.period ?? period ?? 1
  );
  const [color, setColor] = useState(course?.color ?? COURSE_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: course?.id ?? generateId(),
      name: name.trim(),
      instructor: instructor.trim(),
      room: room.trim(),
      day: selectedDay,
      period: selectedPeriod,
      color,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-t-3xl px-5 pt-5 pb-8 shadow-2xl animate-slide-up">
        {/* Handle */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">
            {isEdit ? '授業を編集' : '授業を追加'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Course name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              授業名 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: 情報処理論"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Instructor */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              担当教員
            </label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="例: 田中 太郎"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Room */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              教室番号
            </label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="例: 3号館 301"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Day & Period */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">曜日</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value as DayOfWeek)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}曜日
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">時限</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(Number(e.target.value) as Period)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              >
                {PERIODS.map((p) => (
                  <option key={p} value={p}>
                    {p}時限
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">色</label>
            <div className="flex gap-2 flex-wrap">
              {COURSE_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={clsx(
                    'w-8 h-8 rounded-full transition-transform hover:scale-110',
                    color === c && 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {isEdit && (
              <button
                type="button"
                onClick={() => onDelete(course!.id)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 text-red-500 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
              >
                <Trash2 size={15} />
                削除
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-blue-600 active:scale-95 transition-all"
            >
              {isEdit ? '保存' : '追加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
