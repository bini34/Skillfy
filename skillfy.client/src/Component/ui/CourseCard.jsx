import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'https://localhost:7182';

const CourseCard = ({ id, coursename, teachername, price, rating, lessoncount, coursethumbline, enrollmentCount }) => {
  const navigate = useNavigate();
  const imageUrl = coursethumbline ? `${API_BASE}${coursethumbline}` : null;

  const slug = coursename?.replace(/\s+/g, '-') || '';

  const handleClick = useCallback(() => {
    navigate(`/course/${slug}/overview`, { state: { courseid: id, coursename } });
  }, [navigate, id, slug, coursename]);

  const initials = teachername ? teachername.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '?';

  return (
    <button
      onClick={handleClick}
      className="card card-hover text-left w-full group focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      aria-label={`View course: ${coursename}`}
    >
      <div className="relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={coursename}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src = ''; e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-44 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <svg className="h-12 w-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        )}
        {price !== undefined && (
          <span className="absolute top-2 right-2 badge bg-primary-600 text-white font-semibold">
            {price === 0 ? 'Free' : `$${price}`}
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors">
          {coursename}
        </h3>

        <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
          {rating !== undefined && (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {typeof rating === 'number' ? rating.toFixed(1) : rating}
            </span>
          )}
          {enrollmentCount !== undefined && (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {enrollmentCount}
            </span>
          )}
          {lessoncount !== undefined && (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {lessoncount} lessons
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 flex-shrink-0">
            {initials}
          </div>
          <p className="text-xs text-gray-600 truncate">{teachername}</p>
        </div>
      </div>
    </button>
  );
};

export default CourseCard;
