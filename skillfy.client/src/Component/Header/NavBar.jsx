import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';

const CATEGORIES = ['Design', 'Development', 'IT & Software', 'Business', 'Marketing', 'Photography', 'Health & Care', 'Technology'];

const NavBar = ({ color }) => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const cartCount = useCartStore((s) => s.count());

  const [searchInput, setSearchInput] = useState('');
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const isDark = color === 'white';
  const linkClass = `text-sm font-medium transition-colors hover:text-primary-600 ${isDark ? 'text-white' : 'text-gray-700'}`;

  const handleLogout = () => {
    clearAuth();
    setIsUserOpen(false);
    navigate('/auth/account/signin');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      navigate(`/course/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
    }
  };

  const navToCategory = (cat) => {
    setIsCatOpen(false);
    navigate(`/topic/${encodeURIComponent(cat.toLowerCase())}`);
  };

  const initials = user ? `${(user.Fname || user.fname || '?')[0]}${(user.Lname || user.lname || '')[0] || ''}`.toUpperCase() : '';

  return (
    <nav className="flex items-center gap-4 lg:gap-6" aria-label="Main navigation">
      {/* Categories dropdown */}
      <div className="relative hidden md:block">
        <button
          onClick={() => { setIsCatOpen((o) => !o); setIsUserOpen(false); }}
          className={`${linkClass} flex items-center gap-1`}
          aria-haspopup="true"
          aria-expanded={isCatOpen}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Categories
          <svg className={`h-3 w-3 transition-transform ${isCatOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isCatOpen && (
          <div className="absolute top-full left-0 mt-2 w-52 rounded-xl bg-white border border-gray-100 shadow-modal py-1 z-50 animate-fade-in">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => navToCategory(cat)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative hidden sm:flex items-center">
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="What do you want to learn?"
          aria-label="Search courses"
          className="w-56 lg:w-72 rounded-full border border-gray-300 bg-white px-4 py-1.5 pl-9 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        <svg className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Nav links */}
      <Link to="/courses" className={linkClass}>Courses</Link>
      {isAuthenticated && <Link to="/mycourse" className={linkClass}>My Learning</Link>}

      {/* Cart */}
      {isAuthenticated && (
        <Link to="/cart" className="relative" aria-label={`Shopping cart, ${cartCount} items`}>
          <svg className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-700'} hover:text-primary-600 transition-colors`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>
      )}

      {/* Auth */}
      {!isAuthenticated ? (
        <div className="flex items-center gap-2">
          <Link to="/auth/account/signin" className={`${linkClass} whitespace-nowrap`}>Sign in</Link>
          <Link to="/auth/account/register" className="btn-primary btn btn-sm whitespace-nowrap">Register</Link>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => { setIsUserOpen((o) => !o); setIsCatOpen(false); }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white hover:bg-primary-700 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label="User menu"
            aria-haspopup="true"
            aria-expanded={isUserOpen}
          >
            {initials || '?'}
          </button>
          {isUserOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white border border-gray-100 shadow-modal py-1 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.Fname || user?.fname} {user?.Lname || user?.lname}</p>
                <p className="text-xs text-gray-500 truncate">{user?.Email || user?.email}</p>
              </div>
              <Link
                to="/instructor/profile/"
                onClick={() => setIsUserOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
