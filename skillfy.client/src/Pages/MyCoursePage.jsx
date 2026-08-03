import { useState, useEffect } from 'react';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import LessonCard from '../Component/ui/LessonCard';
import SkeletonCard from '../Component/ui/SkeletonCard';
import EmptyState from '../Component/ui/EmptyState';
import ErrorState from '../Component/ui/ErrorState';
import apiService from '../Services/apiService';
import useAuthStore from '../store/authStore';
import { toArray } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function MyCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = useAuthStore((s) => s.user);

  const fetchCourses = () => {
    if (!user?.Id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    apiService.getData(`api/course/enrolledcourse${user.Id}`)
      .then((response) => {
        setCourses(toArray(response.data));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch your courses. Please try again.');
        setLoading(false);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchCourses(); }, [user?.Id]);

  return (
    <>
      <Header color="black" />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 py-8">
          <div className="page-container">
            <h1 className="section-heading">My Courses</h1>
            <p className="mt-1 text-gray-500">
              {loading ? '' : `${courses.length} enrolled course${courses.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        <div className="page-container py-10">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <ErrorState title="Couldn't load your courses" message={error} onRetry={fetchCourses} />
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <LessonCard
                  key={course.courseid || course.courseID}
                  courseID={course.courseid || course.courseID}
                  imageUrl={course.thumbline}
                  Title={course.coursename}
                  instructorImage={course.teacherpicture}
                  instructorName={course.teachername}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No courses yet"
              description="You haven't enrolled in any courses. Start learning today!"
              action={
                <Link to="/courses" className="btn-primary btn">
                  Browse Courses
                </Link>
              }
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
