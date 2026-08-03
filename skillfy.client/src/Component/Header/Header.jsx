import NavBar from './NavBar';
import { Link } from 'react-router-dom';

function Header({ color, backgroundcolor }) {
  const isDark = color === 'white';

  return (
    <div
      className={`sticky top-0 z-40 w-full border-b ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}
      style={backgroundcolor ? { backgroundColor: backgroundcolor } : undefined}
    >
      <div className="page-container">
        <header className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-primary-600'} hover:opacity-90 transition-opacity flex-shrink-0`}
            aria-label="Skillfy home"
          >
            Skillfy
          </Link>
          <NavBar color={color} />
        </header>
      </div>
    </div>
  );
}

export default Header;
