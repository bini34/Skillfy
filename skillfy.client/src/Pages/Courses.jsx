import { useEffect, useState } from 'react';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import axios from 'axios';
import CourseCard from '../Component/ui/CourseCard';
import SkeletonCard from '../Component/ui/SkeletonCard';
import EmptyState from '../Component/ui/EmptyState';
import ErrorState from '../Component/ui/ErrorState';
import { toArray } from '../lib/utils';

const API_BASE = import.meta.env.VITE_API_URL || 'https://localhost:7182';

export default function Courses() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE}/api/course/coursecard`);
      setCourseData(toArray(response.data));
    } catch {
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = search
    ? courseData.filter((c) => c.coursename?.toLowerCase().includes(search.toLowerCase()))
    : courseData;

  return (
    <>
      <Header color="black" />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 py-8">
          <div className="page-container">
            <h1 className="section-heading">All Courses</h1>
            <p className="mt-1 text-gray-500">{courseData.length} courses available</p>
            <div className="mt-4 max-w-md">
              <div className="relative">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter courses..."
                  className="input pl-9"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="page-container py-10">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <ErrorState title="Couldn't load courses" message={error} onRetry={fetchCourses} />
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((course) => (
                <CourseCard key={course.id || course.courseID} {...course} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={search ? `No results for "${search}"` : 'No courses available'}
              description={search ? 'Try adjusting your search terms.' : 'Check back later for new courses.'}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
