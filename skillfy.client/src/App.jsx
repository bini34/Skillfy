import './App.css';
import SignupPage from './Pages/SignupPage';
import SigninPage from './Pages/SigninPage';
import HomePage from './Pages/HomePage';
import ShoppingCart from './Pages/ShoppingCart';
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
import MyCourse from './Pages/MyCoursePage'
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
        path: '/:coursename',
        element: <CourseDetail />
    },
    {
      path: '/cart',
      element: <Cart />
    },
    {
      path: '/course/learn',
      element: <CourseLearn />
    },
    {
      path: '/instructor/courses/',
      element: <InstructorAdminDashBoardPage />
    },
    {
      path: '/instructor/courses/create/add-lessons/',
      element: <ChapterLessonsPage />
    },
    {
      path: '/test',
      element: <Sidebar />
    },
    {
      path: '/instructor/courses/create',
      element: <CourseCreate />
    },
    {
      path: '/mycourse',
      element:<MyCourse/>

    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
