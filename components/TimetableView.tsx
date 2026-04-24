'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Course, DAYS, PERIODS, DayOfWeek, Period } from '@/lib/types';
import { loadCourses, saveCourses } from '@/lib/storage';
import CourseModal from './CourseModal';
import clsx from 'clsx';

export default function TimetableView() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modalState, setModalState] = useState<{
    open: boolean;
    day?: DayOfWeek;
    period?: Period;
    course?: Course;
  }>({ open: false });

  useEffect(() => {
    setCourses(loadCourses());
  }, []);

  const getCourse = useCallback(
    (day: DayOfWeek, period: Period) =>
      courses.find((c) => c.day === day && c.period === period),
    [courses]
  );

  const handleSave = (course: Course) => {
    setCourses((prev) => {
      const filtered = prev.filter((c) => c.id !== course.id);
      const updated = [...filtered, course];
      saveCourses(updated);
      return updated;
    });
    setModalState({ open: false });
  };

  const handleDelete = (id: string) => {
    setCourses((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveCourses(updated);
      return updated;
    });
    setModalState({ open: false });
  };

  const openAdd = (day: DayOfWeek, period: Period) => {
    setModalState({ open: true, day, period });
  };

  const openEdit = (course: Course) => {
    setModalState({ open: true, course });
  };

  return (
    <div className="p-3">
      {/* Timetable grid */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {/* Header row */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {/* period column header */}
          <div className="py-2 text-center text-xs text-gray-400 font-medium border-r border-gray-100" />
          {DAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-semibold text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Period rows */}
        {PERIODS.map((period) => (
          <div
            key={period}
            className={clsx(
              'grid grid-cols-7',
              period < PERIODS[PERIODS.length - 1] && 'border-b border-gray-100'
            )}
          >
            {/* Period label */}
            <div className="flex flex-col items-center justify-center py-1 border-r border-gray-100">
              <span className="text-xs font-bold text-gray-500">{period}</span>
            </div>

            {/* Course cells */}
            {DAYS.map((day) => {
              const course = getCourse(day, period);
              return (
                <div
                  key={`${day}-${period}`}
                  className="p-0.5 min-h-[64px]"
                  onClick={() => (course ? openEdit(course) : openAdd(day, period))}
                >
                  {course ? (
                    <div
                      className="h-full rounded-lg p-1.5 cursor-pointer hover:brightness-95 transition-all"
                      style={{ backgroundColor: course.color }}
                    >
                      <p className="text-white text-[10px] font-semibold leading-tight line-clamp-2">
                        {course.name}
                      </p>
                      <p className="text-white/80 text-[9px] mt-0.5 truncate">
                        {course.room}
                      </p>
                    </div>
                  ) : (
                    <div className="h-full rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
                      <Plus
                        size={14}
                        className="text-gray-200 group-hover:text-gray-400 transition-colors"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <p className="text-center text-xs text-gray-400 mt-3">
        セルをタップして授業を追加・編集
      </p>

      {/* Add/Edit Modal */}
      {modalState.open && (
        <CourseModal
          day={modalState.day}
          period={modalState.period}
          course={modalState.course}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModalState({ open: false })}
        />
      )}
    </div>
  );
}
