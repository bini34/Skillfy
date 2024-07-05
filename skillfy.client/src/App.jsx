import './App.css';
import SignupPage from './Pages/SignupPage';
import SigninPage from './Pages/SigninPage';
import HomePage from './Pages/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from './Pages/CartPage';
import CourseLearn from './Pages/CourseLearn';
import CreateCourse from './Component/InstructorAdmin/CourseForm';
import TestDataGrid from './Component/ui/TestDataGrid';
import CourseEditor from './Component/CourseEditor/CourseEditor';
import CourseLessons from './Pages/CourseLessons';
import InstructorAdminDashBoardPage from './Pages/InstructorAdminDashBoardPage';
import Sidebar from './Component/Testt/test';
import ChapterLessonsPage from './Pages/ChapterLessonsPage';
import CourseDetail from './Pages/CourseDetailOverview';
import CourseCreate from './Pages/CourseCreate';
import MyCourse from './Pages/MyCoursePage';
import PrivateRoute from './Component/PrivateRoute'; // Make sure to import your PrivateRoute component
import NotFoundPage from './Pages/404'; // Import your 404 page component
import Courses from './Pages/Courses';
import SearchPage from './Pages/SearchPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />

    },
    {
      path: '/auth/account/signin',
      element: <SigninPage />
    },
    {
      path: '/auth/account/register',
      element: <SignupPage />
    },
    {
      path: 'course/:coursename/overview',
      element: <PrivateRoute element={<CourseDetail />} allowedRoles={['student']} />

    },
    {
      path: 'course/:coursename/curriculum',
      element: <PrivateRoute element={<CourseDetail />} allowedRoles={['student']} />

    },
    {
      path: 'course/:coursename/instructor',
      element: <PrivateRoute element={<CourseDetail />} allowedRoles={['student']} />

    },
    {
      path: 'course/:coursename/reviews',
      element: <PrivateRoute element={<CourseDetail />} allowedRoles={['student']} />

    },
    {
      path: '/courses',
      element: <PrivateRoute element={<Courses />} allowedRoles={['student']} />

    },
    {
      path: '/cart',
      element: <PrivateRoute element={<Cart />} allowedRoles={['student']} />

    },
    {
      path: '/course/learn',
      element: <PrivateRoute element={<CourseLearn />} allowedRoles={['student']} />
    },
    {
      path: '/instructor/courses/',
      element: <PrivateRoute element={<InstructorAdminDashBoardPage />} allowedRoles={['Instructor']} />
    },
    {
      path: '/instructor/courses/create/add-lessons/',
      element: <PrivateRoute element={<ChapterLessonsPage />} allowedRoles={['Instructor']} />
    },
    {
      path: '/instructor/courses/create',
      element: <PrivateRoute element={<CourseCreate />} allowedRoles={['Instructor']} />
    },
    {
      path: '/mycourse',
      element: <PrivateRoute element={<MyCourse />} allowedRoles={['student']} />
    },
    {
      path: '/course/search',
      element: <SearchPage />
    },
    {
      path: '*',
      element: <NotFoundPage /> // Add the 404 page route
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
