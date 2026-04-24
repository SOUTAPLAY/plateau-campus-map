'use client';

import { Course } from './types';

const STORAGE_KEY = 'plateau-campus-map-courses';

export function loadCourses(): Course[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Course[]) : [];
  } catch {
    return [];
  }
}

export function saveCourses(courses: Course[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}
