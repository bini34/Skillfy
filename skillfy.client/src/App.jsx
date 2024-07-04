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
      path: '/auth/account/registor',
      element: <SignupPage />
    },
    {
      path: '/course-detail-overview',
      element: <CourseDetail />
    },
    {
      path: '/course-detail-curriculum',
      element: <CourseDetail />
    },
    {
      path: '/course-detail-instructor',
      element: <CourseDetail />
    },
    {
      path: 'course/:coursename',
      element: <CourseDetail />
    },
    {
      path: '/cart',
      element: <Cart />
    },
    {
      path: '/course/learn',
      element: <PrivateRoute element={<CourseLearn />} allowedRoles={['user']} />
    },
    {
      path: '/instructor/courses/',
      element: <PrivateRoute element={<InstructorAdminDashBoardPage />} allowedRoles={['instructor']} />
    },
    {
      path: '/instructor/courses/create/add-lessons/',
      element: <PrivateRoute element={<ChapterLessonsPage />} allowedRoles={['instructor']} />
    },
    {
      path: '/test',
      element: <Sidebar />
    },
    {
      path: '/instructor/courses/create',
      element: <PrivateRoute element={<CourseCreate />} allowedRoles={['instructor']} />
    },
    {
      path: '/mycourse',
      element: <PrivateRoute element={<MyCourse />} allowedRoles={['user']} />
    },
    {
      path: '*',
      element: <NotFoundPage /> // Add the 404 page route
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
