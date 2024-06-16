import './App.css';
import SignupPage from './Pages/SignupPage'
import SigninPage from './Pages/SigninPage'
import HomePage from './Pages/HomePage'
import CourseDetail from './Pages/CourseDetail';
import ShoppingCart from './Pages/ShoppingCart';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from './Component/ShoppingCart/Cart/Cart';
import CourseLearn from './Pages/CourseLearn';
import CreateCourse from './Component/InstructorAdmin/CourseForm'
import TestDataGrid from './Component/ui/TestDataGrid';
import CourseEditor from './Component/CourseEditor/CourseEditor';
import CourseLessons from './Pages/CourseLessons';
import InstructorAdminDashBoardPage from './Pages/InstructorAdminDashBoardPage';
import Sidebar from './Component/Testt/test';
import ChapterLessonsPage from './Pages/ChapterLessonsPage'
//import InstructorCreateCourse from './Pages/InstructorCreateCourse'

import CourseCreate from './Pages/CourseCreate'
 function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage/>
        },
        {
            path: '/auth/account/signin',
            element: <SigninPage/>
        },
        {
            path: '/auth/account/registor',
            element: <SignupPage/>
        },
        {
            path: '/coursedetail',
            element: <CourseDetail/>
        },
        {
            path: '/cart',
            element: <Cart/>
        },
        {
            path: '/course/learn',
            element: <CourseLearn/>
        },
        {
            // path:'/data',
            // element: <CourseEditor/>
            // //element: <CreateCourse/>
            // //element: <TestDataGrid/>
        },
        {
            path:'/instructor/courses/',
            element:<InstructorAdminDashBoardPage/>
        },
        {
            path:'/instructor/courses/create/add-lessons/',
            element:<ChapterLessonsPage/>
            // path:'/course/chapter/lessons',
            // element:<CourseLessons/>
        },
        {
            path:'/test',
            element:<Sidebar/>
        },
        {
            path:'/instructor/courses/create',
            element: <CourseCreate/>
            //element:<InstructorCreateCourse/>
        }
    ])
    
    return <RouterProvider router={router}/>;

}
export default App;
