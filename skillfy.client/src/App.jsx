import './App.css';
import SignupPage from './Pages/SignupPage';
import SigninPage from './Pages/SigninPage';
import HomePage from './Pages/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from './Pages/CartPage';
import CourseLearn from './Pages/CourseLearn';
import InstructorAdminDashBoardPage from './Pages/InstructorAdminDashBoardPage';
import ChapterLessonsPage from './Pages/ChapterLessonsPage';
import CourseDetail from './Pages/CourseDetailOverview';
import CourseCreate from './Pages/CourseCreate';
import MyCourse from './Pages/MyCoursePage';
import PrivateRoute from './Component/PrivateRoute';
import NotFoundPage from './Pages/404';
import Courses from './Pages/Courses';
import SearchPage from './Pages/SearchPage';
import CategoriesPage from './Pages/CategoriesPage';
import InstractorProfileUpdatePage from './Pages/InstractorProfileUpdatePage';
import AdminDashboardPage from './Pages/AdminDashboardPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/auth/account/signin', element: <SigninPage /> },
    { path: '/auth/account/register', element: <SignupPage /> },
    { path: '/auth/forgot-password', element: <ForgotPasswordPage /> },

    { path: 'course/:coursename/overview',   element: <PrivateRoute element={<CourseDetail />} allowedRoles={['student']} /> },
    { path: 'course/:coursename/curriculum', element: <PrivateRoute element={<CourseDetail />} allowedRoles={['student']} /> },
    { path: 'course/:coursename/instructor', element: <PrivateRoute element={<CourseDetail />} allowedRoles={['student']} /> },
    { path: 'course/:coursename/reviews',    element: <PrivateRoute element={<CourseDetail />} allowedRoles={['student']} /> },

    { path: '/courses', element: <Courses /> },
    { path: '/course/search', element: <SearchPage /> },
    { path: '/topic/:category', element: <CategoriesPage /> },

    { path: '/cart',        element: <PrivateRoute element={<Cart />}         allowedRoles={['student']} /> },
    { path: '/course/learn',element: <PrivateRoute element={<CourseLearn />}  allowedRoles={['student']} /> },
    { path: '/mycourse',    element: <PrivateRoute element={<MyCourse />}     allowedRoles={['student']} /> },

    { path: '/instructor/courses/',              element: <PrivateRoute element={<InstructorAdminDashBoardPage />} allowedRoles={['Instructor']} /> },
    { path: '/instructor/courses/create',        element: <PrivateRoute element={<CourseCreate />}                allowedRoles={['Instructor']} /> },
    { path: '/instructor/courses/create/add-lessons/', element: <PrivateRoute element={<ChapterLessonsPage />}   allowedRoles={['Instructor']} /> },
    { path: '/instructor/profile/',              element: <PrivateRoute element={<InstractorProfileUpdatePage />} allowedRoles={['Instructor']} /> },

    { path: '/admin/dashboard', element: <PrivateRoute element={<AdminDashboardPage />} allowedRoles={['Admin', 'admin']} /> },

    { path: '*', element: <NotFoundPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
