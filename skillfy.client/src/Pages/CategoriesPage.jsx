import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import CourseCard from '../Component/ui/CourseCard';
import SkeletonCard from '../Component/ui/SkeletonCard';
import EmptyState from '../Component/ui/EmptyState';
import ErrorState from '../Component/ui/ErrorState';
import { toArray } from '../lib/utils';

const API_BASE = import.meta.env.VITE_API_URL || 'https://localhost:7182';

export default function CategoriesPage() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const { category } = useParams();

  const categoryname = decodeURIComponent(category || location.state?.topic || '');
  const displayName = categoryname.charAt(0).toUpperCase() + categoryname.slice(1);

  const fetchCourses = async () => {
    if (!categoryname) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE}/api/course/coursebycatagory${categoryname}`);
      setCourseData(toArray(response.data));
    } catch {
      setError('Failed to load courses for this category.');
      setCourseData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, [categoryname]);

  return (
    <>
      <Header color="black" />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 py-8">
          <div className="page-container">
            <nav aria-label="Breadcrumb" className="mb-2">
              <ol className="flex items-center gap-1 text-sm text-gray-500">
                <li><a href="/courses" className="hover:text-primary-600 transition-colors">Courses</a></li>
                <li aria-hidden="true">/</li>
                <li className="text-gray-900 font-medium">{displayName}</li>
              </ol>
            </nav>
            <h1 className="section-heading">{displayName} Courses</h1>
            <p className="mt-1 text-gray-500">
              {loading ? 'Loading…' : `${courseData.length} course${courseData.length !== 1 ? 's' : ''} found`}
            </p>
          </div>
        </div>

        <div className="page-container py-10">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <ErrorState title="Couldn't load courses" message={error} onRetry={fetchCourses} />
          ) : courseData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courseData.map((course) => (
                <CourseCard key={course.id || course.courseID} {...course} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={`No courses in ${displayName}`}
              description="This category doesn't have any courses yet. Check back later."
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
