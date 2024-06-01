import './App.css';
import Signup from './Component/Signup/Signup';
import InstructorProfileInfo from './Component/InstructorProfile/InstructorProfileInfo';
import SignupPage from './Pages/SignupPage'
import SigninPage from './Pages/SigninPage'
import CourseCard from './Component/ui/CourseCard'
import ShoppingCartCard from './Component/ShoppingCart/ShoppingCartCard';
import CourseDetailsCard from './Component/CourseDetail/CourseDetailsCard';
import CourseView from './Component/CourseView/CourseView';
import CourseDetailHeader from './Component/CourseDetail/CourseDetailHeader';
import CourseReviews from './Component/CourseDetail/CourseReviews';
import InstructorPage from './Component/Instructor/InstructorPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Test from './Component/Testt/test';
import HomePage from './Pages/HomePage'
import CourseDetail from './Pages/CourseDetail';

 function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage/>
        },
        {
            path: '/Signin',
            element: <SigninPage/>
        },
        {
            path: '/Signup',
            element: <SignupPage/>
        },
        {
            path: '/CourseDetail',
            element: <CourseDetail/>
        }

    ])
    
    return <RouterProvider router={router}/>;

}
export default App;
