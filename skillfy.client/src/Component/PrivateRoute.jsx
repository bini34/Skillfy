import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const PrivateRoute = ({ element, allowedRoles }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const getRole = useAuthStore((s) => s.getRole);
  const hasRole = useAuthStore((s) => s.hasRole);

  if (!isAuthenticated) {
    return <Navigate to="/auth/account/signin" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    const role = getRole();
    if (role === 'Admin') return <Navigate to="/admin/dashboard" replace />;
    if (role === 'Instructor') return <Navigate to="/instructor/courses/" replace />;
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;