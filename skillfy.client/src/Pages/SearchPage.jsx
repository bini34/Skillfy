import { useEffect, useState } from 'react';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import axios from 'axios';
import CourseCard from '../Component/ui/CourseCard';
import SkeletonCard from '../Component/ui/SkeletonCard';
import EmptyState from '../Component/ui/EmptyState';
import ErrorState from '../Component/ui/ErrorState';
import { useLocation, useSearchParams } from 'react-router-dom';
import { toArray } from '../lib/utils';

const API_BASE = import.meta.env.VITE_API_URL || 'https://localhost:7182';

export default function SearchPage() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q') || location.state?.coursename || '';

  const fetchCourses = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE}/api/course/search${query}`);
      setCourseData(toArray(response.data));
    } catch {
      setError('Search failed. Please try again.');
      setCourseData([]);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchCourses(); }, [query]);

  return (
    <>
      <Header color="black" />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 py-8">
          <div className="page-container">
            {query ? (
              <>
                <h1 className="section-heading">Results for &ldquo;{query}&rdquo;</h1>
                <p className="mt-1 text-gray-500">
                  {loading ? 'Searching…' : `${courseData.length} course${courseData.length !== 1 ? 's' : ''} found`}
                </p>
              </>
            ) : (
              <h1 className="section-heading">Search Courses</h1>
            )}
          </div>
        </div>

        <div className="page-container py-10">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <ErrorState title="Search failed" message={error} onRetry={fetchCourses} />
          ) : !query ? (
            <EmptyState title="Enter a search term" description="Type a course name in the search bar above to find courses." />
          ) : courseData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courseData.map((course) => (
                <CourseCard key={course.id || course.courseID} {...course} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={`No results for "${query}"`}
              description="Make sure all words are spelled correctly, or try different keywords."
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
