import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'https://localhost:7182';

const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

const LessonCard = ({ courseID, imageUrl, Title, instructorImage, instructorName, rated, progress = 0 }) => {
  const navigate = useNavigate();
  const thumbUrl = imageUrl ? `${API_BASE}${imageUrl}` : null;

  return (
    <button
      onClick={() => navigate('/course/learn', { state: { courseID, israted: rated } })}
      className="card card-hover text-left w-full group focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      aria-label={`Continue learning: ${Title}`}
    >
      <div className="relative overflow-hidden">
        {thumbUrl ? (
          <img
            src={thumbUrl}
            alt={Title}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center">
            <svg className="h-10 w-10 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3 shadow-lg">
            <svg className="h-6 w-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {capitalize(Title)}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600 flex-shrink-0">
            {capitalize(instructorName)?.[0] || '?'}
          </div>
          <p className="text-xs text-gray-500 truncate">{capitalize(instructorName)}</p>
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default LessonCard;
